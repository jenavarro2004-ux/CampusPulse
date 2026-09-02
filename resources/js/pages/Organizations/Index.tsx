import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Search,
    Building2,
    Users,
    Plus,
    Check,
    X,
    AlertCircle,
    ArrowUpRight,
    Loader2,
    Pencil,
    Trash2
} from 'lucide-react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
    index as organizationsIndex,
    create as createOrganization,
    show as showOrganization,
    edit as editOrganization,
    destroy as destroyOrganization,
    updateStatus
} from '@/routes/organizations';
import type { PageProps } from '@/types';

interface Organization {
    id: number;
    name: string;
    code: string;
    description: string | null;
    status: 'active' | 'inactive' | 'pending';
    users_count?: number;
    created_at: string;
    updated_at: string;
}

interface IndexProps {
    organizations: Organization[];
    filters: {
        search?: string;
        status?: string;
    };
    canCreate: boolean;
}

export default function Index({ organizations, filters, canCreate }: IndexProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            organizationsIndex.url({ query: { search, status } }),
            {},
            { preserveState: true, replace: true }
        );
    };

    const handleStatusFilter = (newStatus: string) => {
        setStatus(newStatus);
        router.get(
            organizationsIndex.url({ query: { search, status: newStatus } }),
            {},
            { preserveState: true, replace: true }
        );
    };

    const handleUpdateStatus = (id: number, newStatus: 'active' | 'inactive' | 'pending') => {
        setLoadingId(id);
        router.patch(
            updateStatus.url(id),
            { status: newStatus },
            {
                onFinish: () => setLoadingId(null),
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

    const isAdminOrOssa = user?.role ? ['admin', 'ossa'].includes(user.role) : false;

    return (
        <AuthenticatedLayout>
            <Head title="Organization Directory" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-cpsu-primary-dark tracking-tight">Organization Directory</h1>
                        <p className="text-sm text-gray-500">Browse official Central Philippines State University student groups, clubs, and councils.</p>
                    </div>
                    {canCreate && (
                        <Link
                            href={createOrganization.url()}
                            className="inline-flex items-center gap-2 bg-cpsu-primary hover:bg-cpsu-primary-dark text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                            Register Club
                        </Link>
                    )}
                </div>

                {/* Filters Row */}
                <div className="bg-white border border-cpsu-border rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="w-full md:max-w-md relative flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or code..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-cpsu-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 focus:border-cpsu-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-cpsu-surface hover:bg-gray-100 border border-cpsu-border text-cpsu-text font-semibold text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <button
                            onClick={() => handleStatusFilter('')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${status === ''
                                ? 'bg-cpsu-primary text-white border-cpsu-primary shadow-sm'
                                : 'bg-white border-cpsu-border text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            All Clubs
                        </button>
                        <button
                            onClick={() => handleStatusFilter('active')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${status === 'active'
                                ? 'bg-cpsu-primary text-white border-cpsu-primary shadow-sm'
                                : 'bg-white border-cpsu-border text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Active
                        </button>
                        {isAdminOrOssa && (
                            <>
                                <button
                                    onClick={() => handleStatusFilter('pending')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${status === 'pending'
                                        ? 'bg-cpsu-primary text-white border-cpsu-primary shadow-sm'
                                        : 'bg-white border-cpsu-border text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    Pending Review
                                </button>
                                <button
                                    onClick={() => handleStatusFilter('inactive')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${status === 'inactive'
                                        ? 'bg-cpsu-primary text-white border-cpsu-primary shadow-sm'
                                        : 'bg-white border-cpsu-border text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    Inactive
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Directory Roster Grid */}
                {organizations.length === 0 ? (
                    <div className="bg-white border border-cpsu-border rounded-xl p-12 text-center shadow-sm space-y-3">
                        <Building2 className="h-12 w-12 text-gray-300 mx-auto" />
                        <h3 className="text-lg font-bold text-cpsu-primary-dark">No Organizations Found</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">
                            We couldn't find any organizations matching your filters. Try adjusting your search query or view active groups.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {organizations.map((org) => {
                            const isUpdating = loadingId === org.id;

                            return (
                                <div
                                    key={org.id}
                                    className="bg-white border border-cpsu-border rounded-xl shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                                >
                                    {/* Top Accented Banner */}
                                    <div className="h-2 bg-cpsu-primary" />

                                    <div className="p-6 flex-1 space-y-4">
                                        {/* Row: Code & Status */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-extrabold text-cpsu-primary-dark bg-cpsu-surface border border-cpsu-border px-2.5 py-1 rounded">
                                                {org.code}
                                            </span>
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(org.status)}`}>
                                                {org.status === 'pending' && <AlertCircle className="h-3 w-3 animate-pulse" />}
                                                {org.status.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Name & Desc */}
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-lg text-cpsu-text line-clamp-1">{org.name}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed min-h-[4.5rem]">
                                                {org.description || 'No description provided.'}
                                            </p>
                                        </div>

                                        {/* Stats Indicator */}
                                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-cpsu-surface px-3 py-2 rounded-lg border border-cpsu-border">
                                            <Users className="h-4 w-4 text-cpsu-primary" />
                                            <span className="font-semibold text-cpsu-text">{org.users_count || 0}</span>
                                            <span>Approved Members</span>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="bg-cpsu-surface px-6 py-4 border-t border-cpsu-border flex items-center justify-between gap-2">
                                        <Link
                                            href={showOrganization.url(org.id)}
                                            className="inline-flex items-center gap-1 text-xs font-bold text-cpsu-primary hover:text-cpsu-primary-dark transition-colors cursor-pointer"
                                        >
                                            View Profile
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>

                                        <div className="flex items-center gap-1.5">
                                            {/* Edit Button */}
                                            <Link
                                                href={editOrganization.url(org.id)}
                                                className="inline-flex items-center justify-center h-7 w-7 rounded bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
                                                title="Edit Organization"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Link>

                                            {/* Delete Button (Admin/OSSA) */}
                                            {isAdminOrOssa && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevents parent elements from capturing the click

                                                        if (window.confirm(`Are you sure you want to delete ${org.name}?`)) {
                                                            router.delete(destroyOrganization.url(org.id), {
                                                                preserveScroll: true,
                                                                onError: (errors) => {
                                                                    console.error('Delete failed:', errors);
                                                                },
                                                            });
                                                        }
                                                    }}
                                                    className="inline-flex items-center justify-center h-7 w-7 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                                                    title="Delete Organization"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            )}

                                            {/* Status Actions */}
                                            {isAdminOrOssa && (
                                                <>
                                                    {org.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(org.id, 'active')}
                                                            disabled={isUpdating}
                                                            className="inline-flex items-center justify-center h-7 w-7 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors disabled:opacity-50 cursor-pointer"
                                                            title="Approve"
                                                        >
                                                            {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-4 w-4" />}
                                                        </button>
                                                    )}
                                                    {org.status === 'active' && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(org.id, 'inactive')}
                                                            disabled={isUpdating}
                                                            className="inline-flex items-center justify-center h-7 w-7 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors disabled:opacity-50 cursor-pointer"
                                                            title="Deactivate"
                                                        >
                                                            {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-4 w-4" />}
                                                        </button>
                                                    )}
                                                    {org.status === 'inactive' && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(org.id, 'active')}
                                                            disabled={isUpdating}
                                                            className="inline-flex items-center justify-center h-7 w-7 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors disabled:opacity-50 cursor-pointer"
                                                            title="Activate"
                                                        >
                                                            {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-4 w-4" />}
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
