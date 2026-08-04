import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { 
    ArrowLeft, 
    Building2, 
    Users, 
    Check, 
    X, 
    AlertCircle, 
    UserCheck, 
    Calendar,
    Mail,
    Plus,
    UserPlus,
    Loader2,
    ShieldAlert
} from 'lucide-react';
import type { PageProps } from '@/types';
import { 
    index, 
    join, 
    approveMember, 
    rejectMember 
} from '@/routes/organizations';

interface Organization {
    id: number;
    name: string;
    code: string;
    description: string | null;
    status: 'active' | 'inactive' | 'pending';
    created_at: string;
    updated_at: string;
}

interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    joined_at: string | null;
}

interface PendingApp {
    id: number;
    name: string;
    email: string;
    student_number: string | null;
    applied_at: string | null;
}

interface ShowProps {
    organization: Organization;
    roster: Member[];
    pendingApplications: PendingApp[];
    membership: {
        status: 'pending' | 'approved' | 'rejected' | null;
        role: string | null;
    };
    isOfficer: boolean;
}

export default function Show({ organization, roster, pendingApplications, membership, isOfficer }: ShowProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const [actionLoading, setActionLoading] = useState(false);
    const [actionUserId, setActionUserId] = useState<number | null>(null);

    const handleJoin = () => {
        setActionLoading(true);
        router.post(
            join.url(organization.id),
            {},
            {
                onFinish: () => setActionLoading(false),
                preserveScroll: true,
            }
        );
    };

    const handleApproveMember = (studentId: number) => {
        setActionUserId(studentId);
        router.patch(
            approveMember.url({ organization: organization.id, user: studentId }),
            {},
            {
                onFinish: () => setActionUserId(null),
                preserveScroll: true,
            }
        );
    };

    const handleRejectMember = (studentId: number) => {
        setActionUserId(studentId);
        router.patch(
            rejectMember.url({ organization: organization.id, user: studentId }),
            {},
            {
                onFinish: () => setActionUserId(null),
                preserveScroll: true,
            }
        );
    };

    const getStatusStyles = (status: Organization['status']) => {
        switch (status) {
            case 'active':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'inactive':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'pending':
                return 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    // Separate roster into Officers vs General Members
    const officers = roster.filter(m => ['president', 'officer'].includes(m.role));
    const generalMembers = roster.filter(m => !['president', 'officer'].includes(m.role));

    return (
        <AuthenticatedLayout>
            <Head title={`${organization.code} Profile`} />

            <div className="space-y-6">
                {/* Back & Breadcrumb */}
                <div>
                    <Link
                        href={index.url()}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cpsu-primary font-semibold transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Directory
                    </Link>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white border border-cpsu-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="h-16 w-16 rounded-xl bg-cpsu-primary-dark text-cpsu-gold flex items-center justify-center font-extrabold text-2xl shadow-sm border border-white/10 shrink-0">
                            {organization.code}
                        </div>
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-extrabold text-cpsu-primary-dark tracking-tight leading-none">
                                    {organization.name}
                                </h1>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(organization.status)}`}>
                                    {organization.status.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Established: {new Date(organization.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Membership Join/Apply Status Action Block */}
                    <div className="shrink-0">
                        {organization.status !== 'active' ? (
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 border border-rose-200 rounded-lg text-sm font-semibold bg-rose-50 text-rose-700">
                                <ShieldAlert className="h-4 w-4" />
                                Registration Pending Review
                            </span>
                        ) : (
                            <>
                                {membership.status === 'approved' && (
                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-200 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700">
                                        <UserCheck className="h-4 w-4" />
                                        You are a {membership.role === 'president' ? 'President' : membership.role === 'officer' ? 'Officer' : 'Member'}
                                    </span>
                                )}

                                {membership.status === 'pending' && (
                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 border border-amber-200 rounded-lg text-sm font-semibold bg-amber-50 text-amber-700 animate-pulse">
                                        <AlertCircle className="h-4 w-4" />
                                        Join Request Pending Approval
                                    </span>
                                )}

                                {membership.status === 'rejected' && (
                                    <button
                                        onClick={handleJoin}
                                        disabled={actionLoading}
                                        className="inline-flex items-center gap-2 bg-cpsu-primary hover:bg-cpsu-primary-dark text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                                        Re-apply to Join Club
                                    </button>
                                )}

                                {membership.status === null && (
                                    <button
                                        onClick={handleJoin}
                                        disabled={actionLoading}
                                        className="inline-flex items-center gap-2 bg-cpsu-primary hover:bg-cpsu-primary-dark text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                                        Request to Join Club
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Details & Charter */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Club Charter Description */}
                        <div className="bg-white border border-cpsu-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-cpsu-surface px-6 py-4 border-b border-cpsu-border">
                                <h3 className="font-bold text-cpsu-primary-dark">Club Charter & Objectives</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {organization.description || 'No description provided for this organization.'}
                                </p>
                            </div>
                        </div>

                        {/* Roster Listings */}
                        <div className="bg-white border border-cpsu-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-cpsu-surface px-6 py-4 border-b border-cpsu-border flex justify-between items-center">
                                <h3 className="font-bold text-cpsu-primary-dark flex items-center gap-2">
                                    <Users className="h-4 w-4 text-cpsu-primary" />
                                    Active Roster
                                </h3>
                                <span className="text-xs bg-white border border-cpsu-border px-2 py-0.5 rounded text-gray-500 font-semibold">
                                    {roster.length} Total
                                </span>
                            </div>

                            <div className="divide-y divide-cpsu-border">
                                {/* Officers Block */}
                                {officers.length > 0 && (
                                    <div className="p-6 space-y-4">
                                        <h4 className="text-xs font-extrabold text-cpsu-primary-dark uppercase tracking-wider">Leadership Registry</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {officers.map((officer) => (
                                                <div key={officer.id} className="p-3 border border-cpsu-border rounded-lg flex items-center gap-3 bg-cpsu-surface/30">
                                                    <div className="h-8 w-8 rounded-full bg-cpsu-gold/20 flex items-center justify-center font-bold text-xs text-cpsu-gold-dark border border-cpsu-gold/30">
                                                        {officer.name[0]}
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-cpsu-text">{officer.name}</h5>
                                                        <p className="text-xs text-cpsu-primary font-semibold uppercase">{officer.role}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Members Block */}
                                <div className="p-6 space-y-4">
                                    <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">General Membership</h4>
                                    {generalMembers.length === 0 ? (
                                        <p className="text-xs text-gray-400">No active general members registered yet.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {generalMembers.map((member) => (
                                                <div key={member.id} className="p-3 border border-cpsu-border rounded-lg flex items-center justify-between gap-3 bg-white hover:bg-cpsu-surface/20 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-xs text-gray-500">
                                                            {member.name[0]}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-sm font-semibold text-cpsu-text">{member.name}</h5>
                                                            <p className="text-xs text-gray-400">Student Member</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Administration & Management */}
                    <div className="space-y-6">
                        {/* Member Application Review Board */}
                        {isOfficer && (
                            <div className="bg-white border border-cpsu-border rounded-xl shadow-sm overflow-hidden">
                                <div className="bg-cpsu-surface px-6 py-4 border-b border-cpsu-border">
                                    <h3 className="font-bold text-cpsu-primary-dark">Roster Applications</h3>
                                    <p className="text-xs text-gray-400">Review pending requests from students to join.</p>
                                </div>
                                <div className="p-6">
                                    {pendingApplications.length === 0 ? (
                                        <div className="text-center py-6 text-gray-400 space-y-2">
                                            <Check className="h-8 w-8 text-emerald-500 mx-auto" />
                                            <p className="text-sm font-semibold text-cpsu-text">Roster is up to date</p>
                                            <p className="text-xs">No pending student join requests found.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {pendingApplications.map((app) => {
                                                const isProcessing = actionUserId === app.id;
                                                return (
                                                    <div key={app.id} className="p-4 border border-cpsu-border rounded-xl bg-cpsu-surface/20 space-y-3">
                                                        <div>
                                                            <h4 className="text-sm font-bold text-cpsu-text">{app.name}</h4>
                                                            <p className="text-xs text-gray-500 font-semibold">{app.student_number}</p>
                                                            <p className="text-xs text-gray-400 truncate">{app.email}</p>
                                                        </div>
                                                        <div className="flex gap-2 justify-end border-t border-cpsu-border/50 pt-3">
                                                            <button
                                                                onClick={() => handleRejectMember(app.id)}
                                                                disabled={isProcessing}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                                                            >
                                                                {isProcessing ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                                                                Reject
                                                            </button>
                                                            <button
                                                                onClick={() => handleApproveMember(app.id)}
                                                                disabled={isProcessing}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                                                            >
                                                                {isProcessing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                                                                Approve
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* General Info Info-card */}
                        <div className="bg-white border border-cpsu-border rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="font-bold text-cpsu-primary-dark border-b border-cpsu-border pb-2">Institutional Details</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase font-bold">University Host</span>
                                    <span className="font-semibold text-cpsu-text">Central Philippines State University</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase font-bold">Acronym</span>
                                    <span className="font-semibold text-cpsu-text">{organization.code}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase font-bold">Auditable Roster</span>
                                    <span className="font-semibold text-cpsu-text">Public Directory & End-of-Sem Logs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
