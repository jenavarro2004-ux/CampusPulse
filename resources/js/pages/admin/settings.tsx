import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Settings() {
    return (
        <>
            <Head title="Admin Settings - CampusLink" />
            <div className="flex flex-col p-6 max-w-7xl mx-auto w-full space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
                <p className="text-gray-600">Configure system parameters, permissions, and academic terms.</p>
            </div>
        </>
    );
}

Settings.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Settings', href: '#' }]}>{page}</AppLayout>
);