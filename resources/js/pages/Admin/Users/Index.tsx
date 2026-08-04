import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import {
    Search,
    Plus,
    UserPlus,
    Users,
    Trash2,
    Pencil,
    Shield,
    Loader2
} from 'lucide-react';
import type { PageProps } from '@/types';
import { create as createUser, edit as editUser, destroy as deleteUser, index as usersIndex } from '@/routes/admin/users';

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    student_number: string | null;
    email: string;
    role: string;
    created_at: string;
}

interface IndexProps {
    users: {
        data: UserData[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search?: string;
        role?: string;
    };
}

export default function Index({ users, filters }: IndexProps) {
    const { auth } = usePage<PageProps>().props;
    const currentUser = auth.user;

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            usersIndex.url({ query: { search, role } }),
            {},
            { preserveState: true, replace: true }
        );
    };

    const handleRoleFilter = (newRole: string) => {
        setRole(newRole);
        router.get(
            usersIndex.url({ query: { search, role: newRole } }),
            {},
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the user account for ${name}? This action cannot be undone.`)) {
            setDeletingId(id);
            router.delete(deleteUser.url(id), {
                preserveScroll: true,
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const getRoleStyles = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'ossa':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'council':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'officer':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="User Provisioning" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-cpsu-primary-dark tracking-tight flex items-center gap-2">
                            <Shield className="h-6 w-6 text-cpsu-gold" />
                            User Provisioning
                        </h1>
                        <p className="text-sm text-gray-500">Manage all student, officer, and administrator accounts.</p>
                    </div>
                    <Link
                        href={createUser.url()}
                        className="inline-flex items-center gap-2 bg-cpsu-primary hover:bg-cpsu-primary-dark text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors cursor-pointer"
                    >
                        <UserPlus className="h-4 w-4" />
                        Create Account
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white border border-cpsu-border rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="w-full md:max-w-md relative flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or student ID..."
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
                        {['', 'student', 'officer', 'ossa', 'admin'].map((r) => (
                            <button
                                key={r}
                                onClick={() => handleRoleFilter(r)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${role === r
                                        ? 'bg-cpsu-primary text-white border-cpsu-primary shadow-sm'
                                        : 'bg-white border-cpsu-border text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {r === '' ? 'All Roles' : r.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white border border-cpsu-border rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-cpsu-surface text-xs text-gray-500 uppercase border-b border-cpsu-border">
                                <tr>
                                    <th className="px-6 py-4 font-bold">User</th>
                                    <th className="px-6 py-4 font-bold">Student/Employee ID</th>
                                    <th className="px-6 py-4 font-bold">Role</th>
                                    <th className="px-6 py-4 font-bold">Registered On</th>
                                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-cpsu-border">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            <Users className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                                            <p className="font-medium text-gray-900">No users found</p>
                                            <p className="text-xs">Adjust your search or filters to see results.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((u) => {
                                        const isCurrentUser = u.id === currentUser.id;
                                        const isDeleting = deletingId === u.id;
                                        return (
                                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-cpsu-primary/10 flex items-center justify-center text-cpsu-primary font-bold text-xs">
                                                            {u.first_name[0]}{u.last_name[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-cpsu-text">
                                                                {u.first_name} {u.last_name}
                                                                {isCurrentUser && <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-normal">You</span>}
                                                            </div>
                                                            <div className="text-xs text-gray-500">{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-600">
                                                    {u.student_number || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${getRoleStyles(u.role)}`}>
                                                        {u.role.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 text-xs">
                                                    {new Date(u.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {!isCurrentUser && (
                                                        <div className="flex items-center justify-end gap-2">
                                                            {/* Edit Button */}
                                                            <Link
                                                                href={editUser.url(u.id)}
                                                                className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
                                                                title="Edit User"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>

                                                            {/* Delete Button */}
                                                            <button
                                                                onClick={() => handleDelete(u.id, `${u.first_name} ${u.last_name}`)}
                                                                disabled={isDeleting}
                                                                className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors disabled:opacity-50 cursor-pointer"
                                                                title="Delete User"
                                                            >
                                                                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination - simple representation */}
                    <div className="bg-cpsu-surface px-6 py-3 border-t border-cpsu-border flex items-center justify-between text-xs text-gray-500">
                        <span>Showing {users.data.length} of {users.total} users (Page {users.current_page} of {users.last_page})</span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}