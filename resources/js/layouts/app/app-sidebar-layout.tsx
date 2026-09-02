import { usePage, router } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps, PageProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { auth, sidebarOpen } = usePage<PageProps>().props;

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <AppShell variant="sidebar" sidebarOpen={sidebarOpen}>
            <AppSidebar user={auth.user} onLogout={handleLogout} />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
