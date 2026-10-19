<?php

namespace App\Http\Controllers\Ossa;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the OSSA dashboard with pending organization submissions.
     */
    public function index(): Response
    {
        return Inertia::render('ossa/dashboard', [
            'pendingOrganizations' => Organization::query()
                ->where('status', 'pending')
                ->oldest('created_at')
                ->get([
                    'id',
                    'name',
                    'code',
                    'description',
                    'created_at',
                ]),
            'pendingOrganizationsCount' => Organization::query()
                ->where('status', 'pending')
                ->count(),
            'activeOrganizationsCount' => Organization::query()
                ->where('status', 'active')
                ->count(),
        ]);
    }
}
