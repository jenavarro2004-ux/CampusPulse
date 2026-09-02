<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    public function index(): Response
    {
        $auditLogs = AuditLog::query()
            ->with('actor:id,name,email')
            ->latest('created_at')
            ->paginate(25);

        return Inertia::render('admin/audit-logs/index', [
            'logs' => $auditLogs,
        ]);
    }
}
