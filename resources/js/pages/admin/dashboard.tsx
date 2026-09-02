import { Head, Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Building2,
    CheckCircle2,
    ClipboardCheck,
    Clock3,
    Users,
} from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { organizations as adminOrganizations } from '@/routes/admin';
import { index as usersIndex } from '@/routes/admin/users';

interface Organization {
    id: number;
    name: string;
    code?: string;
    status: string;
    created_at: string;
}

interface DashboardProps {
    stats?: {
        totalStudents?: number;
        totalOrganizations?: number;
        pendingProposals?: number;
        upcomingEvents?: number;
    };
    organizationStatuses?: Record<string, number>;
    recentOrganizations?: Organization[];
}

const statusStyles: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    inactive: 'bg-gray-100 text-gray-600',
    suspended: 'bg-red-100 text-red-700',
};

function formatStatus(status: string): string {
    return status
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date: string): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}

export default function Dashboard({
    stats,
    organizationStatuses = {},
    recentOrganizations = [],
}: DashboardProps) {
    const totalOrganizations = stats?.totalOrganizations ?? 0;
    const totalStudents = stats?.totalStudents ?? 0;
    const pendingOrganizations = organizationStatuses.pending ?? 0;
    const activeOrganizations = organizationStatuses.active ?? 0;

    const statCards = [
        {
            label: 'Total students',
            value: totalStudents,
            icon: Users,
            href: usersIndex.url(),
            description: 'Registered student accounts',
        },
        {
            label: 'Organizations',
            value: totalOrganizations,
            icon: Building2,
            href: adminOrganizations.url(),
            description: 'Registered campus organizations',
        },
        {
            label: 'Pending organizations',
            value: pendingOrganizations,
            icon: Clock3,
            href: adminOrganizations.url({
                query: { status: 'pending' },
            }),
            description: 'Awaiting administrative review',
        },
        {
            label: 'Active organizations',
            value: activeOrganizations,
            icon: CheckCircle2,
            href: adminOrganizations.url({
                query: { status: 'active' },
            }),
            description: 'Currently active organizations',
        },
    ];

    return (
        <>
            <Head title="OSSA Administrator Dashboard - CampusLink" />

            <div className="relative min-h-full w-full max-w-7xl mx-auto flex-1 space-y-6 p-4 md:p-8">
                <div className="pointer-events-none absolute right-0 top-0 -z-10 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#9df5bd]/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-64 w-64 -translate-x-1/2 translate-y-1/3 rounded-full bg-[#aef2c4]/20 blur-3xl" />

                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00502e] to-[#046d40] p-6 text-white shadow-lg md:p-8">
                    <div className="relative z-10">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                            Administration
                        </p>

                        <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                            Welcome back, Admin.
                        </h2>

                        <p className="max-w-2xl text-sm text-white/90 md:text-base">
                            Here is a current overview of CampusPulse. You have{' '}
                            <strong className="text-[#F4C430]">
                                {pendingOrganizations} pending organizations
                            </strong>{' '}
                            requiring administrative attention.
                        </p>
                    </div>

                    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#F4C430]/15 blur-3xl" />
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map(
                        ({
                            label,
                            value,
                            icon: Icon,
                            href,
                            description,
                        }) => (
                            <Link
                                key={label}
                                href={href}
                                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#00502e] hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            {label}
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-[#00502e]">
                                            {value}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {description}
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-[#f1f5ee] p-2.5">
                                        <Icon className="h-5 w-5 text-[#00502e]" />
                                    </div>
                                </div>

                                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#00502e] opacity-0 transition-opacity group-hover:opacity-100">
                                    Open section
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </span>
                            </Link>
                        ),
                    )}
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="flex flex-col gap-6 lg:col-span-8">
                        <section className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-md">
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Organization Overview
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Current organization registration status.
                                    </p>
                                </div>

                                <Link
                                    href={adminOrganizations.url()}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#00502e] transition-colors hover:text-[#006b3f]"
                                >
                                    View All
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {Object.keys(organizationStatuses).length === 0 ? (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
                                    <Building2 className="mx-auto h-8 w-8 text-gray-400" />

                                    <p className="mt-3 text-sm font-semibold text-gray-700">
                                        No organization data yet
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Organization status information will appear here once records are available.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {Object.entries(organizationStatuses).map(
                                        ([status, count]) => (
                                            <Link
                                                key={status}
                                                href={adminOrganizations.url({
                                                    query: { status },
                                                })}
                                                className="group rounded-xl border border-gray-200 bg-[#f8faf7] p-4 transition-colors hover:border-[#00502e] hover:bg-[#f1f5ee]"
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-lg bg-white p-2 shadow-sm">
                                                            <Building2 className="h-4 w-4 text-[#00502e]" />
                                                        </div>

                                                        <span className="text-sm font-semibold text-gray-800">
                                                            {formatStatus(status)}
                                                        </span>
                                                    </div>

                                                    <span className="text-xl font-bold text-[#00502e]">
                                                        {count}
                                                    </span>
                                                </div>
                                            </Link>
                                        ),
                                    )}
                                </div>
                            )}
                        </section>

                        <section className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-md">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Recent Organizations
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    The five most recently registered organizations.
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b border-gray-200 bg-[#f1f5ee]/50 text-gray-600">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">
                                                Organization
                                            </th>
                                            <th className="px-4 py-3 font-semibold">
                                                Code
                                            </th>
                                            <th className="px-4 py-3 font-semibold">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 font-semibold">
                                                Registered
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {recentOrganizations.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-4 py-10 text-center"
                                                >
                                                    <Building2 className="mx-auto h-8 w-8 text-gray-400" />

                                                    <p className="mt-3 text-sm font-semibold text-gray-700">
                                                        No organizations registered yet
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Registered organizations will appear here.
                                                    </p>
                                                </td>
                                            </tr>
                                        ) : (
                                            recentOrganizations.map(
                                                (organization) => {
                                                    const statusClass =
                                                        statusStyles[
                                                            organization.status
                                                        ] ??
                                                        'bg-gray-100 text-gray-600';

                                                    return (
                                                        <tr
                                                            key={organization.id}
                                                            className="transition-colors hover:bg-[#f1f5ee]/50"
                                                        >
                                                            <td className="px-4 py-3.5 font-semibold text-gray-900">
                                                                {
                                                                    organization.name
                                                                }
                                                            </td>

                                                            <td className="px-4 py-3.5 text-gray-600">
                                                                {organization.code ||
                                                                    '—'}
                                                            </td>

                                                            <td className="px-4 py-3.5">
                                                                <span
                                                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}
                                                                >
                                                                    {formatStatus(
                                                                        organization.status,
                                                                    )}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3.5 text-gray-600">
                                                                {formatDate(
                                                                    organization.created_at,
                                                                )}
                                                            </td>

                                                            <td className="px-4 py-3.5 text-right">
                                                                <Link
                                                                    href={adminOrganizations.url()}
                                                                    className="inline-flex p-1 text-[#00502e] hover:text-[#006b3f]"
                                                                    title="Manage organizations"
                                                                >
                                                                    <ArrowUpRight className="h-4 w-4" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                },
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <aside className="flex flex-col gap-6 lg:col-span-4">
                        <section className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-md">
                            <div className="mb-5">
                                <h3 className="text-base font-bold text-gray-900">
                                    Organization Health
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    A quick summary of registered organizations.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <div className="mb-2 flex items-end justify-between gap-3">
                                        <span className="text-xs text-gray-600">
                                            Active organizations
                                        </span>

                                        <span className="text-sm font-bold text-[#00502e]">
                                            {activeOrganizations}
                                        </span>
                                    </div>

                                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#dfe4dd]">
                                        <div
                                            className="h-2 rounded-full bg-[#00502e]"
                                            style={{
                                                width:
                                                    totalOrganizations > 0
                                                        ? `${Math.min(
                                                              100,
                                                              (activeOrganizations /
                                                                  totalOrganizations) *
                                                                  100,
                                                          )}%`
                                                        : '0%',
                                            }}
                                        />
                                    </div>

                                    <p className="mt-2 text-[11px] text-gray-500">
                                        {totalOrganizations > 0
                                            ? `${Math.round(
                                                  (activeOrganizations /
                                                      totalOrganizations) *
                                                      100,
                                              )}% of all organizations`
                                            : 'No organizations available'}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#f1f5ee] p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Total registered
                                            </p>

                                            <p className="mt-1 text-2xl font-bold text-[#00502e]">
                                                {totalOrganizations}
                                            </p>
                                        </div>

                                        <Building2 className="h-6 w-6 text-[#00502e]" />
                                    </div>
                                </div>

                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                                        <div>
                                            <p className="text-sm font-semibold text-amber-900">
                                                Administrative attention
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-amber-800">
                                                {pendingOrganizations === 0
                                                    ? 'There are currently no pending organizations.'
                                                    : `${pendingOrganizations} organization${
                                                          pendingOrganizations ===
                                                          1
                                                              ? ''
                                                              : 's'
                                                      } waiting for review.`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-md">
                            <div className="mb-5 flex items-center gap-2">
                                <ClipboardCheck className="h-5 w-5 text-[#00502e]" />

                                <h3 className="text-base font-bold text-gray-900">
                                    Dashboard Notes
                                </h3>
                            </div>

                            <div className="space-y-3 text-xs leading-5 text-gray-600">
                                <p>
                                    Dashboard statistics are based on current
                                    database records.
                                </p>

                                <p>
                                    Proposal and event statistics are not shown
                                    until those modules have real data sources.
                                </p>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
