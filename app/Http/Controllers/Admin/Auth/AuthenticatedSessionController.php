<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the admin login view.
     */
    public function create(): Response
    {
        return Inertia::render('admin/auth/login');
    }

    /**
     * Handle an incoming admin authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $credentials = $request->validated();

        $remember = $request->boolean('remember');

        if (! Auth::attempt($credentials, $remember)) {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        if (! $user instanceof User) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

        $userRole = $user->getAttribute('role');
        $normalizedRole = $userRole instanceof UserRole ? $userRole->value : (is_string($userRole) ? $userRole : null);

        // Ensure the authenticated user actually has an admin role.
        if ($normalizedRole !== UserRole::ADMIN->value) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors([
                'email' => 'Access denied. You do not have administrative privileges.',
            ]);
        }

        // Successful admin login -> go to admin dashboard
        return redirect()->intended('/admin/dashboard')->with('success', 'Welcome to the admin dashboard.');
    }
}
