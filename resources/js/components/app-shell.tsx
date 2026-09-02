import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import type { AppVariant } from '@/types';

type Props = {
    children: ReactNode;
    variant?: AppVariant;
    sidebarOpen?: boolean;
};

export function AppShell({ children, variant = 'sidebar', sidebarOpen = true }: Props) {

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}<Toaster /></div>
        );
    }

    return (
        <SidebarProvider defaultOpen={sidebarOpen}>
            {children}
            <Toaster />
        </SidebarProvider>
    );
}
