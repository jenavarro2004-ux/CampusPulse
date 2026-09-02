<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\Organizations\OrganizationStoreRequest;
use App\Http\Requests\Organizations\OrganizationUpdateRequest;
use App\Http\Requests\Organizations\OrganizationUpdateStatusRequest;
use App\Models\Organization;
use App\Models\User;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    /**
     * Normalize a user role into a string value.
     */
    private static function normalizeRole(mixed $role): ?string
    {
        if ($role === null) {
            return null;
        }

        return $role instanceof UserRole ? $role->value : (string) $role;
    }

    /**
     * Display a listing of the organizations.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $userRole = self::normalizeRole($user?->role);
        $query = Organization::query();

        // Admin and OSSA can see all organizations.
        // Guests and other roles can only see active ones, or pending ones they created (are president of).
        if (! $userRole || ! in_array($userRole, [UserRole::ADMIN->value, UserRole::OSSA->value])) {
            $query->where(function ($q) use ($user) {
                $q->where('status', 'active');
                if ($user) {
                    $q->orWhere(function ($sub) use ($user) {
                        $sub->where('status', 'pending')
                            ->whereHas('users', function ($u) use ($user) {
                                $u->where('users.id', $user->id)
                                    ->where('organization_user.role', 'president');
                            });
                    });
                }
            });
        }

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $organizations = $query->withCount(['users' => function ($q) {
            $q->where('organization_user.status', 'approved');
        }])->latest()->get();

        return Inertia::render('organizations/index', [
            'organizations' => $organizations,
            'filters' => $request->only(['search', 'status']),
            'canCreate' => (bool) $user,
        ]);
    }

    /**
     * Show the form for creating a new organization.
     */
    public function create(): Response
    {
        return Inertia::render('organizations/create');
    }

    /**
     * Store a newly created organization in storage.
     */
    public function store(OrganizationStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $organization = Organization::create([
            'name' => $validated['name'],
            'code' => strtoupper($validated['code']),
            'description' => $validated['description'] ?? null,
            'status' => 'pending',
        ]);

        // Auto-associate creator as the approved president
        $organization->users()->attach($request->user()->id, [
            'role' => 'president',
            'status' => 'approved',
        ]);

        AuditLogger::log(
            $request->user(),
            'organization_created',
            $organization,
            null,
            [
                'name' => $organization->name,
                'code' => $organization->code,
                'status' => $organization->status,
            ],
        );

        return redirect()->route('organizations.index')
            ->with('success', 'Organization proposal submitted successfully and is pending review.');
    }

    /**
     * Display the specified organization.
     */
    public function show(Organization $organization, Request $request): Response
    {
        $user = $request->user();
        $userRole = self::normalizeRole($user?->role);

        $isAuthorized = ($userRole && in_array($userRole, [UserRole::ADMIN->value, UserRole::OSSA->value]))
            || $organization->status === 'active'
            || ($user && $organization->users()->where('users.id', $user->id)->exists());

        if (! $isAuthorized) {
            abort(403, 'Unauthorized access to this organization profile.');
        }

        $roster = $organization->users()
            ->where('organization_user.status', 'approved')
            ->select('users.id', 'users.first_name', 'users.last_name', 'users.email')
            ->get()
            ->map(function (User $member, int $index): array {
                $pivot = $member->getRelationValue('pivot');
                $role = $pivot && isset($pivot->role) ? $pivot->role : null;
                $joinedAt = $pivot && isset($pivot->created_at) && $pivot->created_at ? $pivot->created_at->toISOString() : null;

                return [
                    'id' => $member->id,
                    'name' => trim("{$member->first_name} {$member->last_name}"),
                    'email' => $member->email,
                    'role' => $role,
                    'joined_at' => $joinedAt,
                ];
            });

        $currentUserRoleInOrg = $user ? DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->value('role') : null;

        $isOfficer = $user && (
            in_array($currentUserRoleInOrg, ['president', 'officer'])
            || in_array($userRole, [UserRole::ADMIN->value, UserRole::OSSA->value])
        );

        $pendingApplications = [];
        if ($isOfficer) {
            $pendingApplications = $organization->users()
                ->where('organization_user.status', 'pending')
                ->select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'users.student_number')
                ->get()
                ->map(function (User $app, int $index): array {
                    $pivot = $app->getRelationValue('pivot');
                    $appliedAt = $pivot && isset($pivot->created_at) && $pivot->created_at ? $pivot->created_at->toISOString() : null;

                    return [
                        'id' => $app->id,
                        'name' => trim("{$app->first_name} {$app->last_name}"),
                        'email' => $app->email,
                        'student_number' => $app->student_number,
                        'applied_at' => $appliedAt,
                    ];
                });
        }

        $userMembership = $user ? $organization->users()
            ->where('users.id', $user->id)
            ->first() : null;

        $userMembershipPivot = $userMembership ? $userMembership->getRelationValue('pivot') : null;
        $membershipStatus = $userMembershipPivot && isset($userMembershipPivot->status) ? $userMembershipPivot->status : null;
        $membershipRole = $userMembershipPivot && isset($userMembershipPivot->role) ? $userMembershipPivot->role : null;

        return Inertia::render('organizations/show', [
            'organization' => $organization,
            'roster' => $roster,
            'pendingApplications' => $pendingApplications,
            'membership' => [
                'status' => $membershipStatus,
                'role' => $membershipRole,
            ],
            'isOfficer' => $isOfficer,
        ]);
    }

    /**
     * Show the form for editing the specified organization.
     */
    public function edit(Organization $organization, Request $request): Response
    {
        $user = $request->user();
        $userRole = self::normalizeRole($user?->role);

        $currentUserRoleInOrg = $user ? DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->value('role') : null;

        $isAuthorized = ($currentUserRoleInOrg === 'president')
            || ($userRole && in_array($userRole, [UserRole::ADMIN->value, UserRole::OSSA->value]));

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to edit this organization.');
        }

        return Inertia::render('organizations/edit', [
            'organization' => $organization,
        ]);
    }

    /**
     * Update the specified organization in storage.
     */
    public function update(OrganizationUpdateRequest $request, Organization $organization): RedirectResponse
    {
        $user = $request->user();
        $userRole = self::normalizeRole($user?->role);

        $currentUserRoleInOrg = $user ? DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->value('role') : null;

        $isAuthorized = ($currentUserRoleInOrg === 'president')
            || ($userRole && in_array($userRole, [UserRole::ADMIN->value, UserRole::OSSA->value]));

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to update this organization.');
        }

        $validated = $request->validated();

        $previousStatus = $organization->status;
        /** @var Organization $organization */
        $organization->update([
            'name' => $validated['name'],
            'code' => strtoupper($validated['code']),
            'description' => $validated['description'] ?? null,
        ]);

        AuditLogger::log(
            $user,
            'organization_updated',
            $organization,
            null,
            [
                'previous_status' => $previousStatus,
                'name' => $organization->name,
                'code' => $organization->code,
            ],
        );

        return redirect()->route('organizations.index')
            ->with('success', 'Organization updated successfully.');
    }

    /**
     * Remove the specified organization from storage.
     */
    public function destroy(Request $request, Organization $organization): RedirectResponse
    {
        $user = $request->user();
        $userRole = $user instanceof User
            ? (($user->getAttribute('role') instanceof UserRole)
                ? $user->getAttribute('role')->value
                : (is_string($user->getAttribute('role')) ? $user->getAttribute('role') : null))
            : null;

        if (! $userRole || ! in_array($userRole, [UserRole::ADMIN->value, UserRole::OSSA->value])) {
            abort(403, 'Unauthorized to delete this organization.');
        }

        AuditLogger::log(
            $user,
            'organization_deleted',
            $organization,
            null,
            [
                'name' => $organization->name,
                'code' => $organization->code,
                'status' => $organization->status,
            ],
        );

        $organization->users()->detach();
        /** @var Organization $organization */
        $organization->delete();

        return redirect()->route('organizations.index')
            ->with('success', 'Organization deleted successfully.');
    }

    /**
     * Update the organization's status.
     */
    public function updateStatus(OrganizationUpdateStatusRequest $request, Organization $organization): RedirectResponse
    {
        $validated = $request->validated();

        $previousStatus = $organization->status;
        $newStatus = $validated['status'];

        /** @var Organization $organization */
        $organization->update([
            'status' => $newStatus,
        ]);

        AuditLogger::log(
            $request->user(),
            'organization_status_updated',
            $organization,
            null,
            [
                'previous_status' => $previousStatus,
                'new_status' => $newStatus,
            ],
        );

        return redirect()->back()
            ->with('success', "Organization status updated to '{$newStatus}' successfully.");
    }

    /**
     * Join request for the organization.
     */
    public function join(Request $request, Organization $organization): RedirectResponse
    {
        $user = $request->user();

        if (! $user instanceof User) {
            abort(403, 'You must be logged in to join an organization.');
        }

        $existingStatus = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->value('status');

        if ($existingStatus !== null) {
            if ($existingStatus === 'approved') {
                return redirect()->back()->with('error', 'You are already a member of this organization.');
            }
            if ($existingStatus === 'pending') {
                return redirect()->back()->with('error', 'Your request to join this organization is already pending.');
            }
            $organization->users()->updateExistingPivot($user->id, [
                'status' => 'pending',
                'role' => 'member',
            ]);

            return redirect()->back()->with('success', 'Your request to join has been resubmitted.');
        }

        $organization->users()->attach($user->id, [
            'role' => 'member',
            'status' => 'pending',
        ]);

        return redirect()->back()
            ->with('success', 'Join request submitted successfully and is awaiting officer approval.');
    }

    /**
     * Approve membership request.
     */
    public function approveMember(Request $request, Organization $organization, User $user): RedirectResponse
    {
        $currentUser = $request->user();
        if (! $currentUser instanceof User) {
            abort(403, 'Unauthorized to approve members.');
        }

        $currentUserRoleValue = $currentUser->getAttribute('role');
        $currentUserRole = $currentUserRoleValue instanceof UserRole ? $currentUserRoleValue->value : (is_string($currentUserRoleValue) ? $currentUserRoleValue : null);

        $currentUserRoleInOrg = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $currentUser->id)
            ->where('status', 'approved')
            ->value('role');

        $isAuthorized = in_array($currentUserRoleInOrg, ['president', 'officer'])
            || in_array($currentUserRole, [UserRole::ADMIN->value, UserRole::OSSA->value]);

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to approve members.');
        }

        $organization->users()->updateExistingPivot($user->id, [
            'status' => 'approved',
        ]);

        AuditLogger::log(
            $currentUser,
            'organization_membership_approved',
            $organization,
            null,
            [
                'member_id' => $user->id,
                'member_email' => $user->email,
            ],
        );

        return redirect()->back()
            ->with('success', 'Member application approved successfully.');
    }

    /**
     * Reject membership request.
     */
    public function rejectMember(Request $request, Organization $organization, User $user): RedirectResponse
    {
        $currentUser = $request->user();
        if (! $currentUser instanceof User) {
            abort(403, 'Unauthorized to reject members.');
        }

        $currentUserRoleValue = $currentUser->getAttribute('role');
        $currentUserRole = $currentUserRoleValue instanceof UserRole ? $currentUserRoleValue->value : (is_string($currentUserRoleValue) ? $currentUserRoleValue : null);

        $currentUserRoleInOrg = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $currentUser->id)
            ->where('status', 'approved')
            ->value('role');

        $isAuthorized = in_array($currentUserRoleInOrg, ['president', 'officer'])
            || in_array($currentUserRole, [UserRole::ADMIN->value, UserRole::OSSA->value]);

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to reject members.');
        }

        $organization->users()->updateExistingPivot($user->id, [
            'status' => 'rejected',
        ]);

        AuditLogger::log(
            $currentUser,
            'organization_membership_rejected',
            $organization,
            null,
            [
                'member_id' => $user->id,
                'member_email' => $user->email,
            ],
        );

        return redirect()->back()
            ->with('success', 'Member application rejected.');
    }
}
