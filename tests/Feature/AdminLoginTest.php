<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;

uses(RefreshDatabase::class);

it('rejects non-admin credentials on admin login', function () {
    $user = User::factory()->student()->create([
        'email' => 'user@example.com',
    ]);

    // As a guest, visiting /admin should redirect to the admin login page
    $this->get('/admin')->assertRedirect('/admin/login');

    $response = $this->post('/admin/login', [
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    $response->assertSessionHasErrors([
        'email' => 'Access denied. You do not have administrative privileges.',
    ]);

    // Ensure session has been invalidated and the user is not authenticated
    $this->assertGuest();
    $this->assertFalse(Auth::check());
});

it('rate limits repeated admin login attempts', function () {
    User::factory()->student()->create([
        'email' => 'slow-user@example.com',
    ]);

    for ($attempt = 0; $attempt < 5; $attempt++) {
        $this->from('/admin/login')->post('/admin/login', [
            'email' => 'slow-user@example.com',
            'password' => 'wrong-password',
        ]);
    }

    $response = $this->from('/admin/login')->post('/admin/login', [
        'email' => 'slow-user@example.com',
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors([
        'email' => 'Too many login attempts. Please try again in a minute.',
    ]);
    $this->assertGuest();
});

it('allows admin to login and redirects to dashboard', function () {
    $admin = User::factory()->admin()->create([
        'email' => 'admin@example.com',
    ]);

    $response = $this->post('/admin/login', [
        'email' => 'admin@example.com',
        'password' => 'password',
    ]);

    $response->assertRedirect('/admin/dashboard');
    $this->assertAuthenticatedAs($admin);
});
