import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { ShieldCheck, UserRound } from 'lucide-react';
import { useRef } from 'react';
import type { FormEvent } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;
    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
    });
    const passwordInput = useRef<HTMLInputElement>(null);
    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroy,
        processing: deleteProcessing,
        errors: deleteErrors,
        reset: resetDeleteForm,
    } = useForm({
        password: '',
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        patch(ProfileController.update.url(), {
            preserveScroll: true,
        });
    }

    function submitDelete(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        destroy(ProfileController.destroy.url(), {
            preserveScroll: true,
            onError: () => passwordInput.current?.focus(),
            onSuccess: () => resetDeleteForm(),
        });
    }

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <div className="rounded-xl bg-cpsu-primary-dark p-6 text-white shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cpsu-gold text-cpsu-primary-dark">
                            <UserRound className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cpsu-gold">CampusPulse account</p>
                            <h2 className="text-xl font-bold">Profile settings</h2>
                            <p className="text-sm text-white/75">Keep your administrator identity and contact details current.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-cpsu-border bg-white p-6 shadow-sm">
                    <Heading
                        variant="small"
                        title="Personal information"
                        description="Update your name and email address"
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.currentTarget.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.currentTarget.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        {mustVerifyEmail &&
                            auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={send()}
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to re-send the
                                            verification email.
                                        </Link>
                                    </p>

                                    {status ===
                                        'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been
                                            sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}

                        <div className="flex items-center justify-between gap-4 border-t border-cpsu-border pt-5">
                            <span className="inline-flex items-center gap-2 text-xs text-gray-500"><ShieldCheck className="h-4 w-4 text-cpsu-primary" /> Changes are saved securely.</span>
                            <Button
                                type="submit"
                                disabled={processing}
                                data-test="update-profile-button"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <DeleteUser
                password={deleteData.password}
                passwordError={deleteErrors.password}
                processing={deleteProcessing}
                passwordInputRef={passwordInput}
                onPasswordChange={(password) => setDeleteData('password', password)}
                onCancel={() => resetDeleteForm()}
                onSubmit={submitDelete}
            />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
