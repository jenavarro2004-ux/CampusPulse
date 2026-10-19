<?php

use App\Models\Organization;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('ossa users can view the OSSA dashboard', function () {
    $ossa = User::factory()->ossa()->create();

    $this->actingAs($ossa)
        ->get(route('ossa.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ossa/dashboard')
        );
});

test('OSSA dashboard shows pending organizations and real organization counts', function () {
    $ossa = User::factory()->ossa()->create();
    $olderPending = Organization::factory()->create([
        'name' => 'Older Pending Organization',
        'code' => 'OPO',
        'description' => 'First submission.',
        'status' => 'pending',
        'created_at' => now()->subDays(2),
    ]);
    $newerPending = Organization::factory()->create([
        'name' => 'Newer Pending Organization',
        'code' => 'NPO',
        'description' => null,
        'status' => 'pending',
        'created_at' => now()->subDay(),
    ]);
    Organization::factory()->create(['status' => 'active']);
    Organization::factory()->create(['status' => 'inactive']);

    $this->actingAs($ossa)
        ->get(route('ossa.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ossa/dashboard')
            ->has('pendingOrganizations', 2)
            ->where('pendingOrganizations.0.id', $olderPending->id)
            ->where('pendingOrganizations.0.name', $olderPending->name)
            ->where('pendingOrganizations.0.code', $olderPending->code)
            ->where('pendingOrganizations.0.description', $olderPending->description)
            ->where('pendingOrganizations.1.id', $newerPending->id)
            ->missing('pendingOrganizations.0.status')
            ->missing('pendingOrganizations.0.logo')
            ->where('pendingOrganizationsCount', 2)
            ->where('activeOrganizationsCount', 1)
        );
});

test('active organizations are excluded from the pending queue', function () {
    $ossa = User::factory()->ossa()->create();
    Organization::factory()->create([
        'name' => 'Pending Organization',
        'status' => 'pending',
    ]);
    Organization::factory()->create([
        'name' => 'Active Organization',
        'status' => 'active',
    ]);

    $this->actingAs($ossa)
        ->get(route('ossa.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('pendingOrganizations', 1)
            ->where('pendingOrganizations.0.name', 'Pending Organization')
        );
});

test('students are redirected to their own dashboard from the OSSA dashboard', function () {
    $student = User::factory()->student()->create();

    $this->actingAs($student)
        ->get(route('ossa.dashboard'))
        ->assertRedirect(route('student.dashboard'));
});

test('admin dashboard access remains limited to admins', function () {
    $admin = User::factory()->admin()->create();
    $student = User::factory()->student()->create();

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertOk();

    $this->actingAs($student)
        ->get(route('admin.dashboard'))
        ->assertRedirect(route('student.dashboard'));
});
