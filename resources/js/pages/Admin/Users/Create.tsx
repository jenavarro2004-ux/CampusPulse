import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Send, Loader2 } from 'lucide-react';
import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { index as usersIndex, store as createUserStore } from '@/routes/admin/users';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        student_number: '',
        email: '',
        password: '',
        role: 'student',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(createUserStore.url());
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create User Account" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back Link */}
                <div>
                    <Link
                        href={usersIndex.url()}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cpsu-primary font-semibold transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to User Provisioning
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-cpsu-border rounded-xl shadow-sm overflow-hidden">
                    {/* Banner header */}
                    <div className="bg-cpsu-primary-dark p-6 text-white flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-xl">
                            <UserPlus className="h-6 w-6 text-cpsu-gold" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Create New User Account</h2>
                            <p className="text-xs text-white/70">Provision a new student or employee account manually.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-cpsu-text" htmlFor="first_name">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="first_name"
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${
                                        errors.first_name ? 'border-red-500 focus:border-red-500' : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                    required
                                />
                                {errors.first_name && <p className="text-xs text-red-600 font-medium">{errors.first_name}</p>}
                            </div>

                            {/* Last Name */}
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-cpsu-text" htmlFor="last_name">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="last_name"
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${
                                        errors.last_name ? 'border-red-500 focus:border-red-500' : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                    required
                                />
                                {errors.last_name && <p className="text-xs text-red-600 font-medium">{errors.last_name}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-cpsu-text" htmlFor="email">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${
                                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                    required
                                />
                                {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email}</p>}
                            </div>

                            {/* Student Number */}
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-cpsu-text" htmlFor="student_number">
                                    Student/Employee ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="student_number"
                                    type="text"
                                    value={data.student_number}
                                    onChange={(e) => setData('student_number', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${
                                        errors.student_number ? 'border-red-500 focus:border-red-500' : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                    required
                                />
                                {errors.student_number && <p className="text-xs text-red-600 font-medium">{errors.student_number}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Password */}
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-cpsu-text" htmlFor="password">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${
                                        errors.password ? 'border-red-500 focus:border-red-500' : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                    minLength={8}
                                    required
                                />
                                {errors.password && <p className="text-xs text-red-600 font-medium">{errors.password}</p>}
                            </div>

                            {/* Role */}
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-cpsu-text" htmlFor="role">
                                    Role Assignation
                                </label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-3 py-2 border border-cpsu-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 focus:border-cpsu-primary"
                                >
                                    <option value="student">General Student</option>
                                    <option value="officer">Club Officer</option>
                                    <option value="ossa">OSSA Admin</option>
                                    <option value="admin">System Administrator</option>
                                </select>
                                {errors.role && <p className="text-xs text-red-600 font-medium">{errors.role}</p>}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cpsu-border">
                            <Link
                                href={usersIndex.url()}
                                className="px-4 py-2 border border-cpsu-border text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-cpsu-primary hover:bg-cpsu-primary-dark text-white px-5 py-2 rounded-lg font-semibold text-sm shadow transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Create User
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
