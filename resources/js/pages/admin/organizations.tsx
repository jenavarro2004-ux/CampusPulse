import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Organizations() {
    return (
        <>
            <Head title="Organizations - CampusLink" />
            <div className="flex flex-col p-6 max-w-7xl mx-auto w-full space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Organizations Management</h1>
                <p className="text-gray-600">Manage all registered campus organizations here.</p>
            </div>
        </>
    );
}

Organizations.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Organizations', href: '/admin/organizations' }]}>
        {page}
    </AppLayout>
);