<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the organizations.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $query = Organization::query();

        // Admin and OSSA can see all organizations.
        // Others can only see active ones, or pending ones they created (are president of).
        if (! in_array($user->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value])) {
            $query->where(function ($q) use ($user) {
                $q->where('status', 'active')
                    ->orWhere(function ($sub) use ($user) {
                        $sub->where('status', 'pending')
                            ->whereHas('users', function ($u) use ($user) {
                                $u->where('users.id', $user->id)
                                    ->where('organization_user.role', 'president');
                            });
                    });
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

        return Inertia::render('Organizations/Index', [
            'organizations' => $organizations,
            'filters' => $request->only(['search', 'status']),
            'canCreate' => true,
        ]);
    }

    /**
     * Show the form for creating a new organization.
     */
    public function create(): Response
    {
        return Inertia::render('Organizations/Create');
    }

    /**
     * Store a newly created organization in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255', 'unique:organizations,name'],
            'code' => ['required', 'string', 'min:3', 'max:10', 'unique:organizations,code', 'regex:/^[A-Z0-9]+$/'],
            'description' => ['nullable', 'string', 'max:1000'],
        ], [
            'code.regex' => 'The organization code must consist of uppercase letters and numbers only.',
        ]);

        $organization = Organization::create([
            'name' => $request->input('name'),
            'code' => strtoupper($request->input('code')),
            'description' => $request->input('description'),
            'status' => 'pending',
        ]);

        // Auto-associate creator as the approved president
        $organization->users()->attach($request->user()->id, [
            'role' => 'president',
            'status' => 'approved',
        ]);

        return redirect()->route('organizations.index')
            ->with('success', 'Organization proposal submitted successfully and is pending review.');
    }

    /**
     * Display the specified organization.
     */
    public function show(Organization $organization, Request $request): Response
    {
        $user = $request->user();
        $isAuthorized = in_array($user->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value])
            || $organization->status === 'active'
            || $organization->users()->where('users.id', $user->id)->exists();

        if (! $isAuthorized) {
            abort(403, 'Unauthorized access to this organization profile.');
        }

        $roster = $organization->users()
            ->where('organization_user.status', 'approved')
            ->select('users.id', 'users.first_name', 'users.last_name', 'users.email')
            ->get()
            ->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => trim("{$member->first_name} {$member->last_name}"),
                    'email' => $member->email,
                    'role' => $member->getRelationValue('pivot')->getAttribute('role'),
                    'joined_at' => $member->getRelationValue('pivot')->getAttribute('created_at')
                        ? $member->getRelationValue('pivot')->getAttribute('created_at')->toISOString()
                        : null,
                ];
            });

        $currentUserRoleInOrg = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->value('role');

        $isOfficer = in_array($currentUserRoleInOrg, ['president', 'officer'])
            || in_array($user->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value]);

        $pendingApplications = [];
        if ($isOfficer) {
            $pendingApplications = $organization->users()
                ->where('organization_user.status', 'pending')
                ->select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'users.student_number')
                ->get()
                ->map(function ($app) {
                    return [
                        'id' => $app->id,
                        'name' => trim("{$app->first_name} {$app->last_name}"),
                        'email' => $app->email,
                        'student_number' => $app->student_number,
                        'applied_at' => $app->getRelationValue('pivot')->getAttribute('created_at')
                            ? $app->getRelationValue('pivot')->getAttribute('created_at')->toISOString()
                            : null,
                    ];
                });
        }

        $userMembership = $organization->users()
            ->where('users.id', $user->id)
            ->first();

        $membershipStatus = $userMembership?->getRelationValue('pivot')->getAttribute('status');
        $membershipRole = $userMembership?->getRelationValue('pivot')->getAttribute('role');

        return Inertia::render('Organizations/Show', [
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

        $currentUserRoleInOrg = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->value('role');

        $isAuthorized = ($currentUserRoleInOrg === 'president')
            || in_array($user->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value]);

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to edit this organization.');
        }

        return Inertia::render('Organizations/Edit', [
            'organization' => $organization,
        ]);
    }

    /**
     * Update the specified organization in storage.
     */
    public function update(Request $request, Organization $organization): RedirectResponse
    {
        $user = $request->user();

        $currentUserRoleInOrg = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->value('role');

        $isAuthorized = ($currentUserRoleInOrg === 'president')
            || in_array($user->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value]);

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to update this organization.');
        }

        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255', 'unique:organizations,name,'.$organization->id],
            'code' => ['required', 'string', 'min:3', 'max:10', 'unique:organizations,code,'.$organization->id, 'regex:/^[A-Z0-9]+$/'],
            'description' => ['nullable', 'string', 'max:1000'],
        ], [
            'code.regex' => 'The organization code must consist of uppercase letters and numbers only.',
        ]);

        $organization->update([
            'name' => $request->input('name'),
            'code' => strtoupper($request->input('code')),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('organizations.index')
            ->with('success', 'Organization updated successfully.');
    }

    /**
     * Remove the specified organization from storage.
     */
    public function destroy(Request $request, Organization $organization): RedirectResponse
    {
        $user = $request->user();

        if (! in_array($user->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value])) {
            abort(403, 'Unauthorized to delete this organization.');
        }

        $organization->users()->detach();
        $organization->delete();

        return redirect()->route('organizations.index')
            ->with('success', 'Organization deleted successfully.');
    }

    /**
     * Update the organization's status.
     */
    public function updateStatus(Request $request, Organization $organization): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'string', 'in:active,inactive,pending'],
        ]);

        $organization->update([
            'status' => $request->input('status'),
        ]);

        return redirect()->back()
            ->with('success', "Organization status updated to '{$request->input('status')}' successfully.");
    }

    /**
     * Join request for the organization.
     */
    public function join(Request $request, Organization $organization): RedirectResponse
    {
        $user = $request->user();

        $existing = $organization->users()->where('users.id', $user->id)->first();
        if ($existing) {
            if ($existing->getRelationValue('pivot')->getAttribute('status') === 'approved') {
                return redirect()->back()->with('error', 'You are already a member of this organization.');
            }
            if ($existing->getRelationValue('pivot')->getAttribute('status') === 'pending') {
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
        $currentUserRoleInOrg = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $currentUser->id)
            ->where('status', 'approved')
            ->value('role');

        $isAuthorized = in_array($currentUserRoleInOrg, ['president', 'officer'])
            || in_array($currentUser->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value]);

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to approve members.');
        }

        $organization->users()->updateExistingPivot($user->id, [
            'status' => 'approved',
        ]);

        return redirect()->back()
            ->with('success', 'Member application approved successfully.');
    }

    /**
     * Reject membership request.
     */
    public function rejectMember(Request $request, Organization $organization, User $user): RedirectResponse
    {
        $currentUser = $request->user();
        $currentUserRoleInOrg = DB::table('organization_user')
            ->where('organization_id', $organization->id)
            ->where('user_id', $currentUser->id)
            ->where('status', 'approved')
            ->value('role');

        $isAuthorized = in_array($currentUserRoleInOrg, ['president', 'officer'])
            || in_array($currentUser->getRawOriginal('role'), [UserRole::ADMIN->value, UserRole::OSSA->value]);

        if (! $isAuthorized) {
            abort(403, 'Unauthorized to reject members.');
        }

        $organization->users()->updateExistingPivot($user->id, [
            'status' => 'rejected',
        ]);

        return redirect()->back()
            ->with('success', 'Member application rejected.');
    }
}
