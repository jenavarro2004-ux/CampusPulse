<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users are redirected from the dashboard route to their role dashboard', function () {
    $user = User::factory()->student()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('student.dashboard'));
});

test('student can visit student dashboard but not admin dashboard', function () {
    $student = User::factory()->student()->create();
    $this->actingAs($student);

    $response = $this->get(route('student.dashboard'));
    $response->assertOk();

    // Student should be redirected to their student dashboard when trying to access admin dashboard
    $adminResponse = $this->get(route('admin.dashboard'));
    $adminResponse->assertRedirect(route('student.dashboard'));
});

test('admin can visit admin dashboard but not student dashboard', function () {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $response = $this->get(route('admin.dashboard'));
    $response->assertOk();

    // Admin should be redirected to their admin dashboard when trying to access student dashboard
    $studentResponse = $this->get(route('student.dashboard'));
    $studentResponse->assertRedirect(route('admin.dashboard'));
});
