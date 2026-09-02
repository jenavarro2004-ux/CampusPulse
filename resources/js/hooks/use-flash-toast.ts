import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { PageProps } from '@/types';

export function useFlashToast(): void {
    // Safely attempt to read Inertia page props. usePage throws if used outside
    // of the Inertia context (including during SSR), so guard with try/catch.
    let flash: PageProps['flash'] | undefined;

    try {
        const page = usePage<PageProps>();
        flash = page?.props?.flash;
    } catch {
        // Not within Inertia App context (likely SSR or non-Inertia render).
        flash = undefined;
    }

    const success = flash?.success;
    const error = flash?.error;
    const warning = flash?.warning;
    const info = flash?.info;

    useEffect(() => {
        // Only run toasts on the client where `window` is defined.
        if (typeof window === 'undefined') {
            return;
        }

        if (!success && !error && !warning && !info) {
            return;
        }

        if (success) {
            toast.success(success);
        }

        if (error) {
            toast.error(error);
        }

        if (warning) {
            toast.warning(warning);
        }

        if (info) {
            toast.info(info);
        }

        // Depend on the primitive flash values so the effect only runs when they change.
    }, [success, error, warning, info]);
}
