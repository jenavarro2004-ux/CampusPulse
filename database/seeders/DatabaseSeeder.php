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
        $admin = User::factory()->admin()->create([
            'first_name' => 'System',
            'last_name' => 'Admin',
            'name' => 'System Admin',
            'email' => 'admin@cpsu.edu.ph',
            'password' => bcrypt('password'),
        ]);

        // Seed OSSA Staff User
        $ossa = User::factory()->ossa()->create([
            'first_name' => 'OSSA',
            'last_name' => 'Director',
            'name' => 'OSSA Director',
            'email' => 'ossa@cpsu.edu.ph',
            'password' => bcrypt('password'),
        ]);

        // Seed Student Council User
        $council = User::factory()->council()->create([
            'first_name' => 'Council',
            'last_name' => 'President',
            'name' => 'Council President',
            'student_number' => '2026-0002',
            'email' => 'council@cpsu.edu.ph',
            'password' => bcrypt('password'),
        ]);

        // Seed Officer User
        $officer = User::factory()->officer()->create([
            'first_name' => 'Club',
            'last_name' => 'Officer',
            'name' => 'Club Officer',
            'student_number' => '2026-0003',
            'email' => 'officer@cpsu.edu.ph',
            'password' => bcrypt('password'),
        ]);

        // Seed Student User
        $student = User::factory()->student()->create([
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'name' => 'Juan Dela Cruz',
            'student_number' => '2026-0001',
            'email' => 'student@cpsu.edu.ph',
            'password' => bcrypt('password'),
        ]);

        // Seed additional general students
        $additionalStudents = User::factory(10)->student()->create();

        // Seed all active organizations for the Bento Grid / Directory
        $organizations = [
            [
                'name' => 'Supreme Student Government',
                'code' => 'SSG',
                'description' => 'The highest student governing body dedicated to representing student interests and fostering campus unity.',
                'status' => 'active',
                'logo' => '/images/orgs/ssg.png',
            ],
            [
                'name' => 'College of Computer Studies',
                'code' => 'CCS',
                'description' => 'Supports students in computing, tech innovation, and academic development.',
                'status' => 'active',
                'logo' => '/images/orgs/ccs.png',
            ],
            [
                'name' => 'Future Leaders Program',
                'code' => 'FLP',
                'description' => 'Develops student leadership, responsibility, and community involvement.',
                'status' => 'active',
                'logo' => '/images/orgs/flp.png',
            ],
            [
                'name' => 'Philippine Organization of Students',
                'code' => 'POS',
                'description' => 'Philippine Organization of Students fostering active campus student participation.',
                'status' => 'active',
                'logo' => '/images/orgs/pos.png',
            ],
            [
                'name' => 'Reserve Officers Training Corps',
                'code' => 'ROTC',
                'description' => 'Develops discipline and leadership through military-oriented training.',
                'status' => 'active',
                'logo' => '/images/orgs/rotc.png',
            ],
            [
                'name' => 'Agribusiness Society',
                'code' => 'ABS',
                'description' => 'Promotes agribusiness knowledge, entrepreneurship, and professional growth.',
                'status' => 'active',
                'logo' => '/images/orgs/abs.png',
            ],
            [
                'name' => 'LIGTAS',
                'code' => 'LIGTAS',
                'description' => 'Promotes student participation and activities supporting the campus community.',
                'status' => 'active',
                'logo' => '/images/orgs/ligtas.png',
            ],
            [
                'name' => 'The Collegian Herald',
                'code' => 'TC-H',
                'description' => 'The campus student publication providing news and student-centered content.',
                'status' => 'active',
                'logo' => '/images/orgs/tch.png',
            ],
            [
                'name' => 'CPSU Marched Band',
                'code' => 'CPSU-MB',
                'description' => 'Promotes musical performance, discipline, and school spirit through band.',
                'status' => 'active',
                'logo' => '/images/orgs/cpsu-mb.png',
            ],
            [
                'name' => 'Educators Society',
                'code' => 'EDSOC',
                'description' => 'Supports education students through professional development and collaboration.',
                'status' => 'active',
                'logo' => '/images/orgs/edsoc.png',
            ],
            [
                'name' => 'Peer Support Organization',
                'code' => 'PSO',
                'description' => 'Provides peer support and promotes student well-being and engagement.',
                'status' => 'active',
                'logo' => '/images/orgs/pso.png',
            ],
        ];

        $createdOrgs = [];
        foreach ($organizations as $org) {
            $createdOrgs[$org['code']] = Organization::updateOrCreate(['code' => $org['code']], $org);
        }

        // Attach officer to CCS organization as officer
        $createdOrgs['CCS']->users()->syncWithoutDetaching([
            $officer->id => ['role' => 'officer', 'status' => 'approved'],
        ]);

        // Attach test student to FLP organization as pending applicant
        $createdOrgs['FLP']->users()->syncWithoutDetaching([
            $student->id => ['role' => 'member', 'status' => 'pending'],
        ]);

        // Attach test student to SSG as approved member
        $createdOrgs['SSG']->users()->syncWithoutDetaching([
            $student->id => ['role' => 'member', 'status' => 'approved'],
        ]);
    }
}
