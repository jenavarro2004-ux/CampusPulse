<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view user provisioning page', function () {
    $admin = User::factory()->admin()->create();

    // Create some users to populate the list
    User::factory()->student()->count(3)->create();

    $this->actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/users/index')
            ->has('users.data', 4) // 1 admin + 3 students
        );
});

test('non-admin cannot view user provisioning page', function () {
    $student = User::factory()->student()->create();

    $this->actingAs($student)
        ->get(route('admin.users.index'))
        ->assertRedirect(route('student.dashboard'));
});

test('admin can create a new student account', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('admin.users.store'), [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'student_number' => '12345678',
            'email' => 'jane@cpsu.edu.ph',
            'password' => 'password123',
            'role' => 'student',
        ])
        ->assertRedirect(route('admin.users.index'));

    $this->assertDatabaseHas('users', [
        'email' => 'jane@cpsu.edu.ph',
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'student_number' => '12345678',
        'role' => 'student',
        'is_active' => true,
    ]);
});

test('admin can delete a user', function () {
    $admin = User::factory()->admin()->create();
    $student = User::factory()->student()->create();

    $this->actingAs($admin)
        ->delete(route('admin.users.destroy', $student))
        ->assertRedirect(route('admin.users.index'));

    $this->assertDatabaseMissing('users', [
        'id' => $student->id,
    ]);
});

test('admin cannot delete their own account', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->delete(route('admin.users.destroy', $admin))
        ->assertRedirect(); // Should redirect back

    $this->assertDatabaseHas('users', [
        'id' => $admin->id,
    ]);
});
