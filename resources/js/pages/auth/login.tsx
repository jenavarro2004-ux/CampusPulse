import React from 'react';
import { Head, useForm } from '@inertiajs/react';
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

            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left feature panel */}
                    <div className="md:col-span-7 bg-gradient-to-br from-[#004D2C] to-[#00502e] text-white rounded-2xl p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/images/CPSU-LOGO-removebg-preview.png" alt="CampusPulse" className="h-10 w-auto" />
                                <div className="text-lg font-semibold">CampusPulse</div>
                            </div>
                            <h2 className="text-3xl font-bold mb-3">Empowering Campus Leadership</h2>
                            <p className="text-white/90 mb-6 leading-relaxed">Connect, organize, and lead — a single platform for students, club officers, and OSSA administrators.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/8 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-2xl text-[#F4C430]">groups</span>
                                        <div>
                                            <div className="font-semibold">Organizations</div>
                                            <div className="text-sm text-white/80">Find and manage student organizations.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/8 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-2xl text-[#F4C430]">event</span>
                                        <div>
                                            <div className="font-semibold">Events</div>
                                            <div className="text-sm text-white/80">Schedule and RSVP to campus events.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/8 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-2xl text-[#F4C430]">how_to_vote</span>
                                        <div>
                                            <div className="font-semibold">Governance</div>
                                            <div className="text-sm text-white/80">Participate in campus governance.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/8 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-2xl text-[#F4C430]">shield</span>
                                        <div>
                                            <div className="font-semibold">Admin Tools</div>
                                            <div className="text-sm text-white/80">Approvals, audits, and oversight.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-white/80">© {new Date().getFullYear()} Central Philippines State University</div>
                    </div>

                    {/* Right form panel */}
                    <div className="md:col-span-5 bg-white rounded-2xl p-6 md:p-10 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-[#002110]">Sign in</h3>
                                <p className="text-sm text-[#374151]">Sign in as Student, Officer, or OSSA Admin</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-gray-400">
                                <span className="material-symbols-outlined">login</span>
                            </div>
                        </div>

                        {/* Role tabs */}
                        <div className="mb-6">
                            <div className="flex gap-2 rounded-lg p-1 bg-gray-100">
                                {(['student', 'officer', 'admin'] as Role[]).map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setData('role', r)}
                                        className={`flex-1 text-sm py-2 rounded-md font-semibold transition ${data.role === r ? 'bg-white shadow text-[#00502e]' : 'text-[#6b7280] hover:bg-white/50'}`}
                                    >
                                        {r === 'student' && 'Student'}
                                        {r === 'officer' && 'Officer'}
                                        {r === 'admin' && 'OSSA Admin'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="block text-sm font-semibold text-[#374151] mb-1">Institutional Email / ID</Label>
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
                                <Button type="submit" disabled={processing} className="w-full bg-[#00502e] text-white font-bold py-3 rounded-xl hover:opacity-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
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
                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Welcome Back',
    description: 'Sign in to your CampusPulse account.',
};