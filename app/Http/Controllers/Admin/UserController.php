<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Models\User;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Normalize a user role to its string value for logging and comparisons.
     */
    private static function normalizeRole(mixed $role): string
    {
        return $role instanceof UserRole ? $role->value : (string) $role;
    }

    /**
     * Display a listing of users.
     */
    public function index(Request $request): Response
    {
        $query = User::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('student_number', 'like', "%{$search}%");
            });
        }

        if ($role = $request->input('role')) {
            $query->where('role', $role);
        }

        $users = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        return Inertia::render('admin/users/create');
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(UserStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'name' => trim($validated['first_name'].' '.$validated['last_name']),
            'student_number' => $validated['student_number'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'student',
            'is_active' => true,
        ]);

        AuditLogger::log(
            $request->user(),
            'user_created',
            $user,
            null,
            [
                'email' => $user->email,
                'role' => self::normalizeRole($user->role),
            ],
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(UserUpdateRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();

        $userData = [
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'name' => trim($validated['first_name'].' '.$validated['last_name']),
            'student_number' => $validated['student_number'],
            'email' => $validated['email'],
            'role' => $validated['role'] ?? $user->role,
        ];

        // Only update password if a new one is provided
        if (! empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $previousRole = self::normalizeRole($user->role);
        /** @var User $user */
        $user->update($userData);

        $newRole = self::normalizeRole($user->fresh()->role);

        AuditLogger::log(
            $request->user(),
            $previousRole !== $newRole ? 'user_role_changed' : 'user_updated',
            $user,
            null,
            [
                'previous_role' => $previousRole,
                'new_role' => $newRole,
                'changed_fields' => array_keys(array_filter($userData, fn ($value, $key) => $value !== ($user->getOriginal($key) ?? null), ARRAY_FILTER_USE_BOTH)),
            ],
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if (Auth::id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        AuditLogger::log(
            $request->user(),
            'user_deleted',
            $user,
            null,
            [
                'email' => $user->email,
                'role' => self::normalizeRole($user->role),
            ],
        );

        /** @var User $user */
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
