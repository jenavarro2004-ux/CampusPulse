import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    Loader2,
    UserCog
} from 'lucide-react';
import React from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { update as updateUser, index as usersIndex } from '@/routes/admin/users';

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    student_number: string | null;
    email: string;
    role: string;
}

interface EditProps {
    user: UserData;
}

interface UserFormData {
    first_name: string;
    last_name: string;
    email: string;
    student_number: string;
    role: string;
}

export default function Edit({ user }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<UserFormData>({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        student_number: user.student_number || '',
        role: user.role || 'student',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(updateUser.url(user.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit User - ${user.first_name} ${user.last_name}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-cpsu-primary-dark tracking-tight flex items-center gap-2">
                            <UserCog className="h-6 w-6 text-cpsu-gold" />
                            Edit User Account
                        </h1>
                        <p className="text-sm text-gray-500">
                            Update account details and role permissions for {user.first_name} {user.last_name}.
                        </p>
                    </div>
                    <Link
                        href={usersIndex.url()}
                        className="inline-flex items-center gap-2 bg-cpsu-surface hover:bg-gray-100 text-cpsu-text border border-cpsu-border px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Users
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-cpsu-border rounded-xl shadow-sm overflow-hidden p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    disabled={processing}
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className="w-full px-4 py-2 border border-cpsu-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 focus:border-cpsu-primary disabled:bg-gray-50 disabled:text-gray-500"
                                />
                                {errors.first_name && (
                                    <p className="text-rose-600 text-xs mt-1">{errors.first_name}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    disabled={processing}
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className="w-full px-4 py-2 border border-cpsu-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 focus:border-cpsu-primary disabled:bg-gray-50 disabled:text-gray-500"
                                />
                                {errors.last_name && (
                                    <p className="text-rose-600 text-xs mt-1">{errors.last_name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    disabled={processing}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-cpsu-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 focus:border-cpsu-primary disabled:bg-gray-50 disabled:text-gray-500"
                                />
                                {errors.email && (
                                    <p className="text-rose-600 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Student/Employee Number */}
                            <div>
                                <label htmlFor="student_number" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Student / Employee ID
                                </label>
                                <input
                                    id="student_number"
                                    name="student_number"
                                    type="text"
                                    disabled={processing}
                                    value={data.student_number}
                                    onChange={(e) => setData('student_number', e.target.value)}
                                    className="w-full px-4 py-2 border border-cpsu-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 focus:border-cpsu-primary disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="Optional"
                                />
                                {errors.student_number && (
                                    <p className="text-rose-600 text-xs mt-1">{errors.student_number}</p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div className="md:col-span-2">
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
                                    User Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    disabled={processing}
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-4 py-2 border border-cpsu-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 focus:border-cpsu-primary cursor-pointer disabled:bg-gray-50 disabled:text-gray-500"
                                >
                                    <option value="student">STUDENT</option>
                                    <option value="officer">OFFICER</option>
                                    <option value="ossa">OSSA</option>
                                    <option value="council">COUNCIL</option>
                                    <option value="admin">ADMIN</option>
                                </select>
                                {errors.role && (
                                    <p className="text-rose-600 text-xs mt-1">{errors.role}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cpsu-border">
                            <Link
                                href={usersIndex.url()}
                                className="px-4 py-2 rounded-lg text-sm font-semibold border border-cpsu-border text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-cpsu-primary hover:bg-cpsu-primary-dark text-white px-5 py-2 rounded-lg font-semibold text-sm shadow transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
