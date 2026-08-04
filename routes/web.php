<?php

use App\Enums\UserRole;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\OrganizationController;
use App\Models\Organization;
// use App\Models\Announcement;
// use App\Models\Event;
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
        'organizations' => Organization::where('status', 'active')->latest()->take(6)->get(),
        // 'announcements' => Announcement::latest()->take(5)->get(),
        // 'events' => Event::where('date', '>=', now())->take(5)->get(),
    ]);
})->name('home');

// Public Organization Directory & Profiles
Route::get('/organizations', [OrganizationController::class, 'index'])->name('organizations.index');
Route::get('/organizations/{organization}', [OrganizationController::class, 'show'])->name('organizations.show');

/*
|--------------------------------------------------------------------------
| Authenticated Dashboard Redirector
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->get('/dashboard', function (Request $request) {
    $role = $request->user()->role;
    $roleValue = $role instanceof UserRole ? $role->value : $role;

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

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // User Provisioning Resource
    Route::resource('users', UserController::class);
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

Route::middleware(['auth', 'role:ossa'])->get('/ossa/dashboard', function () {
    return Inertia::render('PlaceholderDashboard', ['role' => 'ossa']);
})->name('ossa.dashboard');

Route::middleware(['auth', 'role:council'])->get('/council/dashboard', function () {
    return Inertia::render('PlaceholderDashboard', ['role' => 'council']);
})->name('council.dashboard');

Route::middleware(['auth', 'role:officer'])->get('/officer/dashboard', function () {
    return Inertia::render('PlaceholderDashboard', ['role' => 'officer']);
})->name('officer.dashboard');

/*
|--------------------------------------------------------------------------
| Protected Organization Management & Membership Actions
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {
    // Protected CRUD Resource Routes (excluding public index & show)
    Route::resource('organizations', OrganizationController::class)->except(['index', 'show']);

    // Administrative Status Updates
    Route::patch('/organizations/{organization}/status', [OrganizationController::class, 'updateStatus'])
        ->name('organizations.update-status')
        ->middleware('role:admin,ossa');

    // Membership Actions
    Route::post('/organizations/{organization}/join', [OrganizationController::class, 'join'])
        ->name('organizations.join');
        
    Route::patch('/organizations/{organization}/users/{user}/approve', [OrganizationController::class, 'approveMember'])
        ->name('organizations.approve-member');
        
    Route::patch('/organizations/{organization}/users/{user}/reject', [OrganizationController::class, 'rejectMember'])
        ->name('organizations.reject-member');
});

require __DIR__.'/settings.php';