<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Render the admin dashboard page.
     */
    public function index(): Response
    {
        $totalStudents = User::where('role', UserRole::STUDENT->value)->count();
        $totalOrganizations = Organization::count();

        $organizationStatuses = Organization::query()
            ->select('status')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $recentOrganizations = Organization::query()
            ->latest()
            ->limit(5)
            ->get([
                'id',
                'name',
                'code',
                'status',
                'created_at',
            ]);

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalStudents' => $totalStudents,
                'totalOrganizations' => $totalOrganizations,
                'pendingProposals' => 0,
                'upcomingEvents' => 0,
            ],
            'organizationStatuses' => $organizationStatuses,
            'recentOrganizations' => $recentOrganizations,
        ]);
    }
}
