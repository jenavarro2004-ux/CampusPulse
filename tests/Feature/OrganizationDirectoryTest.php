<?php

use App\Enums\UserRole;
use App\Models\Organization;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page when visiting organizations', function () {
    $this->get(route('organizations.index'))
        ->assertRedirect(route('login'));

    $this->get(route('organizations.create'))
        ->assertRedirect(route('login'));
});

test('students can only see active organizations and their own pending organizations', function () {
    $student = User::factory()->student()->create();
    
    // Create an active organization
    $activeOrg = Organization::factory()->create([
        'status' => 'active',
        'name' => 'Active Club',
        'created_at' => now()->subMinutes(10),
    ]);
    
    // Create a pending organization belonging to another user
    $otherPendingOrg = Organization::factory()->create([
        'status' => 'pending',
        'name' => 'Other Pending Club',
        'created_at' => now()->subMinutes(5),
    ]);
    
    // Create a pending organization belonging to the student
    $myPendingOrg = Organization::factory()->create([
        'status' => 'pending',
        'name' => 'My Pending Club',
        'created_at' => now(),
    ]);
    $myPendingOrg->users()->attach($student->id, ['role' => 'president', 'status' => 'approved']);

    $this->actingAs($student)
        ->get(route('organizations.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Organizations/Index')
            ->has('organizations', 2)
            ->where('organizations.0.name', 'My Pending Club')
            ->where('organizations.1.name', 'Active Club')
        );
});

test('admin and ossa can see all organizations regardless of status', function () {
    $admin = User::factory()->admin()->create();
    
    Organization::factory()->create(['status' => 'active']);
    Organization::factory()->create(['status' => 'pending']);
    Organization::factory()->create(['status' => 'inactive']);

    $this->actingAs($admin)
        ->get(route('organizations.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Organizations/Index')
            ->has('organizations', 3)
        );
});

test('students can propose a new organization', function () {
    $student = User::factory()->student()->create();

    $response = $this->actingAs($student)
        ->post(route('organizations.store'), [
            'name' => 'New Programming Society',
            'code' => 'NPS',
            'description' => 'A club for coding enthusiast students.',
        ]);

    $response->assertRedirect(route('organizations.index'));
    $this->assertDatabaseHas('organizations', [
        'name' => 'New Programming Society',
        'code' => 'NPS',
        'status' => 'pending',
    ]);

    $org = Organization::where('code', 'NPS')->first();
    $this->assertDatabaseHas('organization_user', [
        'user_id' => $student->id,
        'organization_id' => $org->id,
        'role' => 'president',
        'status' => 'approved',
    ]);
});

test('only admin and ossa can update organization status', function () {
    $student = User::factory()->student()->create();
    $admin = User::factory()->admin()->create();
    $org = Organization::factory()->create(['status' => 'pending']);

    // Student cannot update status
    $this->actingAs($student)
        ->patch(route('organizations.update-status', $org->id), ['status' => 'active'])
        ->assertRedirect(route('student.dashboard')); // Redirected by RoleMiddleware

    // Admin can update status
    $this->actingAs($admin)
        ->patch(route('organizations.update-status', $org->id), ['status' => 'active'])
        ->assertRedirect();
        
    $this->assertEquals('active', $org->refresh()->status);
});

test('students can request to join an active organization', function () {
    $student = User::factory()->student()->create();
    $org = Organization::factory()->create(['status' => 'active']);

    $this->actingAs($student)
        ->post(route('organizations.join', $org->id))
        ->assertRedirect();

    $this->assertDatabaseHas('organization_user', [
        'user_id' => $student->id,
        'organization_id' => $org->id,
        'role' => 'member',
        'status' => 'pending',
    ]);
});

test('officers can approve and reject join requests', function () {
    $president = User::factory()->student()->create();
    $applicant = User::factory()->student()->create();
    $org = Organization::factory()->create(['status' => 'active']);
    
    // Attach president
    $org->users()->attach($president->id, ['role' => 'president', 'status' => 'approved']);
    
    // Attach applicant
    $org->users()->attach($applicant->id, ['role' => 'member', 'status' => 'pending']);

    // President approves applicant
    $this->actingAs($president)
        ->patch(route('organizations.approve-member', [$org->id, $applicant->id]))
        ->assertRedirect();

    $this->assertDatabaseHas('organization_user', [
        'user_id' => $applicant->id,
        'organization_id' => $org->id,
        'status' => 'approved',
    ]);

    // Detach and re-request for reject testing
    $org->users()->updateExistingPivot($applicant->id, ['status' => 'pending']);

    // President rejects applicant
    $this->actingAs($president)
        ->patch(route('organizations.reject-member', [$org->id, $applicant->id]))
        ->assertRedirect();

    $this->assertDatabaseHas('organization_user', [
        'user_id' => $applicant->id,
        'organization_id' => $org->id,
        'status' => 'rejected',
    ]);
});
