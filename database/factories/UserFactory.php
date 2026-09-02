<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'name' => "$firstName $lastName",
            'student_number' => fake()->unique()->numerify('2026-####'),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the user is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::ADMIN,
            'student_number' => null,
        ]);
    }

    /**
     * Indicate that the user is a student.
     */
    public function student(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::STUDENT,
        ]);
    }

    /**
     * Indicate that the user is OSSA staff.
     */
    public function ossa(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::OSSA,
            'student_number' => null,
        ]);
    }

    /**
     * Indicate that the user is student council.
     */
    public function council(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::COUNCIL,
        ]);
    }

    /**
     * Indicate that the user is a club officer.
     */
    public function officer(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::OFFICER,
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the model has two-factor authentication configured.
     */
    public function withTwoFactor(): static
    {
        return $this->state(fn (array $attributes) => [
            'two_factor_secret' => encrypt('test-secret'),
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => now(),
        ]);
    }
}
