import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

type Role = 'student' | 'officer' | 'admin';

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        role: 'student' as Role,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        // Dynamic backend routing based on selected role
        const url = data.role === 'admin' ? '/admin/login' : '/login';
        // form already holds the current data (including role). Just post to the selected endpoint.
        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                reset('password');
            },
        });
    }

    return (
        <>
            <Head title="CampusPulse — Sign in" />

            {status && (
                <div className="mb-6 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                    {status}
                </div>
            )}


            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="email" className="block text-sm font-semibold text-[#374151] mb-1">Institutional Email</Label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400">person</span>
                        </div>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoFocus
                            placeholder="you@school.edu"
                            className="block w-full rounded-lg border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#81d9a2] sm:text-sm sm:leading-6 bg-white transition-all duration-200"
                        />
                    </div>
                    {errors.email && <InputError message={errors.email as string} className="mt-1" />}
                </div>

                <div>
                    <Label htmlFor="password" className="block text-sm font-semibold text-[#374151] mb-1">Password</Label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <span className="material-symbols-outlined text-gray-400">lock</span>
                        </div>
                        <PasswordInput
                            id="password"
                            value={data.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                            required
                            placeholder="Password"
                            className="block w-full rounded-lg border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#81d9a2] sm:text-sm sm:leading-6 bg-white transition-all duration-200"
                        />
                    </div>
                    {errors.password && <InputError message={errors.password as string} className="mt-1" />}
                </div>

                <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2">
                        <Checkbox checked={data.remember} onChange={(e: any) => setData('remember', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#00502e]" />
                        <span className="text-sm text-[#374151]">Remember me</span>
                    </label>

                    <div className="text-sm">
                        {canResetPassword && (
                            <TextLink href={request()} className="text-[#00502e] font-medium">Forgot password?</TextLink>
                        )}
                    </div>
                </div>

                <div>
                    <Button type="submit" disabled={processing} className="w-full rounded-xl bg-[#004D2C] px-4 py-4 text-[15px] font-bold text-white shadow-lg hover:bg-[#003820] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 ease-in-out flex items-center justify-center gap-2">
                        {processing && <Spinner className="w-4 h-4" />}
                        {data.role === 'admin' ? 'Sign in as OSSA Admin' : 'Sign in'}
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Button>
                </div>

                {(errors as any).error && <div className="text-sm text-red-600 mt-2">{(errors as any).error as string}</div>}
            </form>

            <div className="mt-4 text-center text-sm text-[#6b7280]">
                Don't have an account? <TextLink href="#" className="text-[#00502e]">Contact OSSA</TextLink>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Access the unified campus portal.',
    description: 'Sign in to access your personalized campus dashboard.',
};
