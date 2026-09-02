<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Render the student dashboard page.
     */
    public function index(): Response
    {
        return Inertia::render('student/dashboard', [
            'myOrganizationsCount' => 1,
            'upcomingEventsCount' => 0,
            'announcements' => [
                [
                    'id' => 1,
                    'title' => 'Welcome to CampusPulse System Launch',
                    'content' => 'We are excited to launch CampusPulse, our new centralized platform for managing student organizations, event proposals, and monitoring campus-wide activities.',
                    'date' => 'August 4, 2026',
                    'type' => 'info',
                ],
                [
                    'id' => 2,
                    'title' => 'First Semester Accreditation Deadline',
                    'content' => 'All student organizations must submit their renewal profiles and accomplishment reports for accreditation on or before August 28, 2026.',
                    'date' => 'August 4, 2026',
                    'type' => 'warning',
                ],
            ],
        ]);
    }
}
