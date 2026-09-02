<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class AuditLogger
{
    /**
     * Record an administrative action in the audit log.
     *
     * @param  array<string, mixed>  $properties
     */
    public static function log(
        ?User $user,
        string $action,
        string|Model|null $targetType = null,
        int|string|null $targetId = null,
        array $properties = [],
        ?string $ipAddress = null,
    ): void {
        if ($targetType instanceof Model) {
            $targetId = $targetType->getKey();
            $targetType = $targetType::class;
        }

        AuditLog::create([
            'user_id' => $user?->id,
            'action' => $action,
            'target_type' => $targetType,
            'target_id' => $targetId,
            'ip_address' => $ipAddress ?? Request::ip(),
            'properties' => $properties,
            'created_at' => now(),
        ]);
    }
}
