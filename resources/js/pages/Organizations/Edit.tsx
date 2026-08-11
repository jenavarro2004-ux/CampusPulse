import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Building2, Save, Loader2 } from 'lucide-react';
import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { index, update } from '@/routes/organizations';

interface Organization {
    id: number;
    name: string;
    code: string;
    description: string | null;
}

interface EditProps {
    organization: Organization;
}

export default function Edit({ organization }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: organization.name || '',
        code: organization.code || '',
        description: organization.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(organization.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${organization.name}`} />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back Link */}
                <div>
                    <Link
                        href={index.url()}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cpsu-primary font-semibold transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Directory
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-cpsu-border rounded-xl shadow-sm overflow-hidden">
                    {/* Banner header */}
                    <div className="bg-cpsu-primary-dark p-6 text-white flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-xl">
                            <Building2 className="h-6 w-6 text-cpsu-gold" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Edit Organization Details</h2>
                            <p className="text-xs text-white/70">Modify institutional recognition and profile information.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-cpsu-text" htmlFor="name">
                                Organization Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${errors.name
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                required
                            />
                            {errors.name && (
                                <p className="text-xs text-red-600 font-medium">{errors.name}</p>
                            )}
                        </div>

                        {/* Code Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-cpsu-text" htmlFor="code">
                                Organization Code / Acronym <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="code"
                                type="text"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                className={`w-full px-3 py-2 border rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${errors.code
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                maxLength={10}
                                required
                            />
                            {errors.code && (
                                <p className="text-xs text-red-600 font-medium">{errors.code}</p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-cpsu-text" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpsu-primary/20 ${errors.description
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-cpsu-border focus:border-cpsu-primary'
                                    }`}
                                maxLength={1000}
                            />
                            {errors.description && (
                                <p className="text-xs text-red-600 font-medium">{errors.description}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cpsu-border">
                            <Link
                                href={index.url()}
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
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Update Organization
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