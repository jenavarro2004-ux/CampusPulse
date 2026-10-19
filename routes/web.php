<?php

use App\Enums\UserRole;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Officer\DashboardController as OfficerDashboardController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\Ossa\DashboardController as OssaDashboardController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'organizations' => Organization::query()
            ->where('status', 'active')
            ->orderByRaw("CASE code
                WHEN 'SSG' THEN 1
                WHEN 'CCS' THEN 2
                WHEN 'FLP' THEN 3
                WHEN 'POS' THEN 4
                WHEN 'ROTC' THEN 5
                WHEN 'ABS' THEN 6
                WHEN 'LIGTAS' THEN 7
                WHEN 'TC-H' THEN 8
                WHEN 'CPSU-MB' THEN 9
                WHEN 'EDSOC' THEN 10
                WHEN 'PSO' THEN 11
                ELSE 12
            END")
            ->orderBy('name')
            ->take(11)
            ->get(),
    ]);
})->name('home');

Route::get('/organizations', [OrganizationController::class, 'index'])->name('organizations.index');

/*
|--------------------------------------------------------------------------
| Authenticated Dashboard Redirector
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->get('/dashboard', function (Request $request) {
    $user = $request->user();

    if (! $user instanceof User) {
        return redirect()->route('home');
    }

    $role = $user->getAttribute('role');
    $roleValue = $role instanceof UserRole ? $role->value : (is_string($role) ? $role : null);

    return match ($roleValue) {
        'admin' => redirect()->route('admin.dashboard'),
        'student' => redirect()->route('student.dashboard'),
        'ossa' => redirect()->route('ossa.dashboard'),
        'council' => redirect()->route('council.dashboard'),
        'officer' => redirect()->route('officer.dashboard'),
        default => redirect()->route('home'),
    };
})->name('dashboard');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Public Admin Authentication Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Redirect bare /admin to the admin login page for unauthenticated users
    Route::get('/', fn () => redirect()->route('admin.login'));

    // Admin login display
    Route::get('/login', fn () => Inertia::render('admin/auth/login'))->name('login');

    // Admin login processing (controller handles role check)
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('login.store');
});

// Protected admin area (requires authentication and admin role)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('audit-logs.index');
    Route::resource('users', UserController::class);

    // Admin Sidebar Navigation Views
    Route::get('/organizations', [OrganizationController::class, 'index'])->name('organizations');
    Route::get('/proposals', fn () => Inertia::render('admin/proposals'))->name('proposals');
    Route::get('/events', fn () => Inertia::render('admin/events'))->name('events');
    Route::get('/members', fn () => Inertia::render('admin/members'))->name('members');
    Route::get('/settings', fn () => Inertia::render('admin/settings'))->name('settings');
});

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:student'])->group(function () {
    Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');
});

/*
|--------------------------------------------------------------------------
| Role Placeholders
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:ossa'])
    ->get('/ossa/dashboard', [OssaDashboardController::class, 'index'])
    ->name('ossa.dashboard');

Route::middleware(['auth', 'role:council'])->get('/council/dashboard', function () {
    return Inertia::render('placeholder-dashboard', ['role' => 'council']);
})->name('council.dashboard');

Route::middleware(['auth', 'role:officer'])->get('/officer/dashboard', [OfficerDashboardController::class, 'index'])->name('officer.dashboard');

/*
|--------------------------------------------------------------------------
| Protected Organization Management & Membership Actions
|
| IMPORTANT: This group must be registered BEFORE the public wildcard
| GET /organizations/{organization} route. Otherwise, visiting
| /organizations/create as a guest matches the wildcard first (404)
| instead of the auth middleware redirecting to login (302).
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {
    Route::resource('organizations', OrganizationController::class)->except(['index', 'show']);

    Route::patch('/organizations/{organization}/status', [OrganizationController::class, 'updateStatus'])
        ->name('organizations.update-status')
        ->middleware('role:admin,ossa');

    Route::post('/organizations/{organization}/join', [OrganizationController::class, 'join'])
        ->name('organizations.join');

    Route::patch('/organizations/{organization}/users/{user}/approve', [OrganizationController::class, 'approveMember'])
        ->name('organizations.approve-member');

    Route::patch('/organizations/{organization}/users/{user}/reject', [OrganizationController::class, 'rejectMember'])
        ->name('organizations.reject-member');
});

/*
|--------------------------------------------------------------------------
| Public Organization Show
| Must come AFTER the auth resource group so /organizations/create is
| handled by the resource (and redirects guests to login) rather than
| being swallowed by this wildcard.
|--------------------------------------------------------------------------
*/

Route::get('/organizations/{organization}', [OrganizationController::class, 'show'])->name('organizations.show');

require __DIR__.'/settings.php';
