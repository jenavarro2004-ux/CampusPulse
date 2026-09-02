import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    status?: string;
};

export default function AdminLogin({ status }: Props) {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post('/admin/login', {
            onError: () => {
                // keep focus / allow UI to show errors
            },
        });
    }

    return (
        <>
            <Head title="Admin Sign in" />

            {status && (
                <div className="mb-6 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-left">
                <div className="space-y-5">
                    <div>
                        <Label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-1">
                            Email
                        </Label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400">person</span>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={form.data.email}
                                onChange={(e: any) => form.setData('email', e.target.value)}
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="admin@example.com"
                                className="block w-full rounded-lg border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00502e] sm:text-sm sm:leading-6 bg-white transition-all duration-200"
                            />
                        </div>
                        <InputError message={form.errors.email} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-1">
                            Password
                        </Label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                <span className="material-symbols-outlined text-gray-400">lock</span>
                            </div>
                            <PasswordInput
                                id="password"
                                name="password"
                                value={form.data.password}
                                onChange={(e: any) => form.setData('password', e.target.value)}
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Password"
                                className="block w-full rounded-lg border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00502e] sm:text-sm sm:leading-6 bg-white transition-all duration-200"
                            />
                        </div>
                        <InputError message={form.errors.password} className="mt-1" />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={form.data.remember}
                                onCheckedChange={(checked: boolean) => form.setData('remember', checked)}
                                tabIndex={3}
                                className="h-4 w-4 rounded border-gray-300 text-[#00502e] focus:ring-[#00502e]"
                            />
                            <Label htmlFor="remember" className="ml-3 block text-sm text-gray-600 cursor-pointer">
                                Remember me
                            </Label>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                                                    className="flex w-full justify-center items-center gap-2 rounded-xl bg-[#004D2C] px-4 py-4 text-[15px] font-bold text-white shadow-lg hover:bg-[#003820] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 h-auto"
                            tabIndex={4}
                            disabled={form.processing}
                            data-test="admin-login-button"
                        >
                            {form.processing && <Spinner className="w-4 h-4 mr-2" />}
                            Sign in as Admin
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Button>
                        <InputError message={form.errors.email || form.errors.password} className="mt-3" />
                    </div>
                </div>
            </form>
        </>
    );
}

AdminLogin.layout = {
    title: 'Access the unified campus portal.',
    description: 'Sign in to access your personalized campus dashboard. Whether you are a student, club officer, or administrator, your credentials will securely direct you to your assigned portal.',
};
