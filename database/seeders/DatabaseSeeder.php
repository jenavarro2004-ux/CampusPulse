<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Admin User
        User::factory()->admin()->create([
            'first_name' => 'System',
            'last_name' => 'Admin',
            'name' => 'System Admin',
            'email' => 'admin@cpsu.edu.ph',
            'password' => bcrypt('password'),
        ]);

        // Seed Student User
        User::factory()->student()->create([
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'name' => 'Juan Dela Cruz',
            'student_number' => '2026-0001',
            'email' => 'student@cpsu.edu.ph',
            'password' => bcrypt('password'),
        ]);

        // Seed some general students
        User::factory(10)->student()->create();

        // Seed organizations
        Organization::factory()->create([
            'name' => 'Supreme Student Government',
            'code' => 'SSG',
            'description' => 'The highest governing body of the students.',
            'status' => 'active',
        ]);

        Organization::factory()->create([
            'name' => 'Alliance of Computer Science Students',
            'code' => 'ACCESS',
            'description' => 'Official student organization of CS students.',
            'status' => 'active',
        ]);

        Organization::factory()->create([
            'name' => 'Young Educators Society',
            'code' => 'YES',
            'description' => 'Official student organization of Education students.',
            'status' => 'pending',
        ]);

        Organization::factory()->create([
            'name' => 'Junior Philippine Institute of Accountants',
            'code' => 'JPIA',
            'description' => 'Official student organization of Accountancy students.',
            'status' => 'inactive',
        ]);

        Organization::factory()->create([
            'name' => 'Association of Agricultural Students',
            'code' => 'AAS',
            'description' => 'Official student organization of Agriculture students.',
            'status' => 'active',
        ]);
    }
}
