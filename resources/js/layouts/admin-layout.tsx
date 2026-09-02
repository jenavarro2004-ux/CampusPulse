import type { ReactNode } from 'react';

import AuthenticatedLayout from '@/layouts/authenticated-layout';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
