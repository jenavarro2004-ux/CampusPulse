import { Head, Link } from '@inertiajs/react';
import {
    FileCheck,
    Building2,
    ArrowUpRight,
    Clock,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { show as showOrganization } from '@/routes/organizations';

interface PendingOrganization {
    id: number;
    name: string;
    code: string;
    description: string | null;
    created_at: string;
}

interface OssaDashboardProps {
    pendingOrganizations: PendingOrganization[];
    pendingOrganizationsCount: number;
    activeOrganizationsCount: number;
}

export default function OssaDashboard({
    pendingOrganizations,
    pendingOrganizationsCount,
    activeOrganizationsCount,
}: OssaDashboardProps) {
    const stats = [
        { label: 'Pending Organizations', value: pendingOrganizationsCount, icon: FileCheck, color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { label: 'Active Organizations', value: activeOrganizationsCount, icon: Building2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    ];

    return (
        <>
            <Head title="OSSA Dashboard - CampusLink" />
            <div className="flex flex-col p-6 max-w-7xl mx-auto w-full space-y-6">
                {/* Banner */}
                <div className="bg-emerald-800 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Office of Student Services & Affairs (OSSA)</h1>
                        <p className="text-emerald-100 text-xs mt-1">
                            Review pending organization submissions and monitor active organizations.
                        </p>
                    </div>
                </div>

                {/* Organization Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {stats.map((s) => {
                        const Icon = s.icon;

                        return (
                            <div key={s.label} className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
                                <div>
                                    <p className="text-gray-500 text-xs font-medium">{s.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl border ${s.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pending Organization Queue */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <h2 className="text-sm font-bold text-gray-800">Pending Organizations</h2>
                        </div>
                        <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-semibold border border-amber-200" aria-live="polite">
                            {pendingOrganizationsCount} pending
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {pendingOrganizations.length === 0 ? (
                            <p className="p-6 text-center text-sm text-gray-500">
                                There are no pending organization submissions.
                            </p>
                        ) : (
                            pendingOrganizations.map((organization) => (
                                <div key={organization.id} className="flex flex-col gap-4 p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex min-w-0 items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-xs font-bold text-emerald-800">
                                            {organization.code}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-xs font-bold text-gray-900">{organization.name}</h3>
                                            <p className="text-[11px] text-gray-500">
                                                Submitted {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(organization.created_at))}
                                            </p>
                                            {organization.description && (
                                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                                    {organization.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        href={showOrganization.url(organization.id)}
                                        className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 sm:self-center"
                                    >
                                        View Details <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

OssaDashboard.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'OSSA Dashboard', href: '#' }]}>{page}</AppLayout>
);
