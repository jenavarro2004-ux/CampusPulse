import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Proposals() {
    return (
        <>
            <Head title="Proposals Review - CampusLink" />
            <div className="flex flex-col p-6 max-w-7xl mx-auto w-full space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Proposals Queue</h1>
                <p className="text-gray-600">Review and approve event and activity proposals submitted by organizations.</p>
            </div>
        </>
    );
}

Proposals.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Proposals', href: '#' }]}>{page}</AppLayout>
);