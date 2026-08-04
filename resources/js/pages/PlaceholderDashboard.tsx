import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Construction, Sparkles, ArrowLeft } from 'lucide-react';
import type { UserRole } from '@/types';

interface PlaceholderDashboardProps {
    role: UserRole;
}

export default function PlaceholderDashboard({ role }: PlaceholderDashboardProps) {
    const roleNames: Record<UserRole, string> = {
        admin: 'System Administrator',
        ossa: 'Office of Student Services & Affairs (OSSA)',
        council: 'Supreme Student Government / Council',
        officer: 'Club Executive / Officer',
        student: 'General Student Portal',
    };

    const roleName = roleNames[role] || 'User Portal';

    return (
        <AuthenticatedLayout>
            <Head title={`${roleName} - Portal`} />

            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
                <div className="bg-cpsu-gold/10 text-cpsu-gold p-6 rounded-full border border-cpsu-gold/20 animate-bounce">
                    <Construction className="h-16 w-16 text-[#C99700]" />
                </div>

                <div className="max-w-md space-y-2">
                    <h1 className="text-2xl font-extrabold text-cpsu-primary-dark tracking-tight">
                        {roleName} Dashboard
                    </h1>
                    <p className="text-gray-500 text-sm">
                        This module is currently under development as part of the CampusPulse 30% Foundation implementation.
                    </p>
                </div>

                <div className="bg-white border border-cpsu-border rounded-xl p-5 max-w-sm shadow-sm flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-cpsu-primary shrink-0 animate-pulse" />
                    <p className="text-xs text-gray-500 text-left leading-relaxed">
                        Features for proposal endorsement, accreditation, and QR code verification will be deployed in the next development phase.
                    </p>
                </div>

                <a 
                    href="/" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cpsu-primary hover:text-cpsu-primary-dark transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Portal Home
                </a>
            </div>
        </AuthenticatedLayout>
    );
}
