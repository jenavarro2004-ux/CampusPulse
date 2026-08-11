<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        $roleValue = $user->getRawOriginal('role');

        if (in_array($roleValue, $roles)) {
            return $next($request);
        }

        // If not authorized for this specific route, redirect to their own dashboard
        return $this->redirectToDashboard($roleValue);
    }

    /**
     * Redirect unauthorized users to their respective home dashboards.
     */
    protected function redirectToDashboard(?string $role): Response
    {
        switch ($role) {
            case 'admin':
                return redirect()->route('admin.dashboard');
            case 'student':
                return redirect()->route('student.dashboard');
            case 'ossa':
                return redirect()->route('ossa.dashboard');
            case 'council':
                return redirect()->route('council.dashboard');
            case 'officer':
                return redirect()->route('officer.dashboard');
            default:
                return redirect()->route('home');
        }
    }
}
