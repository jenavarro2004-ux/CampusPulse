import { usePage, router } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps, PageProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    const { auth, name } = usePage<PageProps>().props;

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <AppShell variant="header">
            <AppHeader
                breadcrumbs={breadcrumbs}
                appName={name ?? 'Campus Pulse'}
                user={auth.user}
                onLogout={handleLogout}
            />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
