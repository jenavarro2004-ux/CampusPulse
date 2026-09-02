<?php

namespace App\Http\Controllers\Officer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Render the officer dashboard page.
     */
    public function index(): Response
    {
        return Inertia::render('placeholder-dashboard', [
            'role' => 'officer',
        ]);
    }
}
