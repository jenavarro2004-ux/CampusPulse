import { Head } from '@inertiajs/react';
import {
    Users,
    Building2,
    FileClock,
    Calendar,
    ArrowUpRight,
    CheckCircle2,
    XCircle,
    AlertCircle,
    QrCode,
    ScanLine,
    Activity
} from 'lucide-react';
import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Organization } from '@/types';

interface Stats {
    totalStudents: number;
    totalOrganizations: number;
    pendingProposals: number;
    upcomingEvents: number;
}

interface DashboardProps {
    stats: Stats;
    recentOrganizations: Organization[];
}

export default function Dashboard({ stats, recentOrganizations }: DashboardProps) {
    const statCards = [
        {
            title: 'Total Students',
            value: stats.totalStudents,
            icon: Users,
            color: 'bg-[#006B3F]/10 text-[#006B3F] border-[#006B3F]/20',
        },
        {
            title: 'Active Events',
            value: stats.upcomingEvents,
            icon: Calendar,
            color: 'bg-[#F4C430]/10 text-[#B88E14] border-[#F4C430]/30',
        },
        {
            title: 'Organizations',
            value: stats.totalOrganizations,
            icon: Building2,
            color: 'bg-[#006B3F]/10 text-[#006B3F] border-[#006B3F]/20',
        },
        {
            title: 'Pending Approvals',
            value: stats.pendingProposals,
            icon: FileClock,
            color: 'bg-orange-50 text-orange-600 border-orange-200',
        },
    ];

    const getStatusBadge = (status: Organization['status']) => {
        switch (status) {
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#006B3F]/10 text-[#006B3F] border border-[#006B3F]/20">
                        <CheckCircle2 className="h-3 w-3" />
                        Active
                    </span>
                );
            case 'inactive':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                        <XCircle className="h-3 w-3" />
                        Inactive
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F4C430]/10 text-[#B88E14] border border-[#F4C430]/30 animate-pulse">
                        <AlertCircle className="h-3 w-3" />
                        Pending
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
                        Unknown
                    </span>
                );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[#004D2C] tracking-tight">Admin Dashboard</h1>
                    <p className="text-sm text-[#6B7280]">Welcome back. Here's what's happening today.</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={idx}
                                className="p-6 bg-[#FFFFFF] rounded-2xl shadow-sm flex items-center justify-between transition-all hover:shadow-md duration-300"
                            >
                                <div className="space-y-1">
                                    <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block">{card.title}</span>
                                    <span className="text-3xl font-extrabold text-[#1F2937]">{card.value}</span>
                                </div>
                                <div className={`p-4 rounded-xl border ${card.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (2/3) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Recent Organizations / Activities Panel */}
                        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-[#004D2C]">Recent Activities</h3>
                                    <p className="text-xs text-[#6B7280]">Latest student group profile registrations and system updates.</p>
                                </div>
                                <button className="flex items-center gap-1 text-sm font-semibold text-[#006B3F] hover:text-[#004D2C] transition-colors cursor-pointer">
                                    View All
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#F8FAF9] border-b border-gray-100">
                                            <th className="p-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Entity</th>
                                            <th className="p-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Type</th>
                                            <th className="p-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                                            <th className="p-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentOrganizations.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="p-8 text-center text-sm text-[#6B7280]">
                                                    No recent activities found.
                                                </td>
                                            </tr>
                                        ) : (
                                            recentOrganizations.slice(0, 5).map((org) => (
                                                <tr key={org.id} className="hover:bg-[#F8FAF9]/50 transition-colors">
                                                    <td className="p-4">
                                                        <div className="font-bold text-[#1F2937]">{org.name}</div>
                                                        <div className="text-xs text-[#6B7280]">{org.code}</div>
                                                    </td>
                                                    <td className="p-4 text-sm font-medium text-[#6B7280]">
                                                        Organization Registration
                                                    </td>
                                                    <td className="p-4 text-sm">
                                                        {getStatusBadge(org.status)}
                                                    </td>
                                                    <td className="p-4 text-sm text-[#6B7280]">
                                                        {new Date(org.created_at).toLocaleDateString('en-US', {
                                                            month: 'short', day: 'numeric', year: 'numeric'
                                                        })}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>



                    </div>

                    {/* Right Column (1/3) */}
                    <div className="space-y-6">

                        {/* Quick Access Actions */}
                        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-[#004D2C] mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex flex-col items-center justify-center p-4 bg-[#F8FAF9] rounded-xl border border-gray-100 hover:border-[#006B3F]/30 hover:bg-[#006B3F]/5 transition-colors group cursor-pointer">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-[#006B3F] mb-2 group-hover:scale-110 transition-transform">
                                        <QrCode className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-bold text-[#1F2937]">Generate QR</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 bg-[#F8FAF9] rounded-xl border border-gray-100 hover:border-[#006B3F]/30 hover:bg-[#006B3F]/5 transition-colors group cursor-pointer">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-[#006B3F] mb-2 group-hover:scale-110 transition-transform">
                                        <ScanLine className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-bold text-[#1F2937]">Scan Code</span>
                                </button>
                                <button className="col-span-2 flex items-center justify-center gap-2 p-3 bg-[#006B3F] text-white rounded-xl font-semibold text-sm hover:bg-[#004D2C] shadow-sm transition-colors cursor-pointer">
                                    <Building2 className="h-4 w-4" />
                                    View Organization Directory
                                </button>
                            </div>
                        </div>

                        {/* Pending Approvals Widget */}
                        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="p-5 border-b border-gray-100 flex items-center gap-2 bg-[#F8FAF9]">
                                <Activity className="h-5 w-5 text-[#B88E14]" />
                                <h3 className="font-bold text-[#1F2937]">Pending Action</h3>
                                <span className="ml-auto bg-[#F4C430] text-[#004D2C] text-xs font-bold px-2 py-0.5 rounded-full">{stats.pendingProposals}</span>
                            </div>
                            <div className="p-5 space-y-4">
                                {stats.pendingProposals > 0 ? (
                                    <>
                                        {/* Mocked Pending Items for UI */}
                                        <div className="flex items-start gap-3">
                                            <div className="h-8 w-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                                <FileClock className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#1F2937] leading-tight">General Assembly Funding</p>
                                                <p className="text-xs text-[#6B7280]">Computer Science Society • 2h ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="h-8 w-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                                <Building2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#1F2937] leading-tight">New Club Registration</p>
                                                <p className="text-xs text-[#6B7280]">Photography Club • 5h ago</p>
                                            </div>
                                        </div>
                                        <button className="w-full mt-2 py-2 text-xs font-bold text-[#006B3F] hover:bg-[#F8FAF9] rounded-lg transition-colors cursor-pointer">
                                            Review All Pending Items
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center py-6 text-sm text-[#6B7280]">
                                        <CheckCircle2 className="h-8 w-8 text-[#006B3F] mx-auto mb-2 opacity-50" />
                                        You're all caught up!
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
