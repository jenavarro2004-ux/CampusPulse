import type { User } from './auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';

export interface Organization {
    id: number;
    name: string;
    code: string;
    description: string | null;
    status: 'active' | 'inactive' | 'pending';
    logo?: string | null;
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User | null; // Updated to allow null for guests on public routes
    };
    name?: string; // Application name
    sidebarOpen?: boolean; // Sidebar open state
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    [key: string]: unknown;
};
