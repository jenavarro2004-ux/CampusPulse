import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    }

    return (
        <>
            <Head title="Confirm password" />

            <form onSubmit={submit} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.currentTarget.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                        autoFocus
                    />

                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                        data-test="confirm-password-button"
                    >
                        {processing && <Spinner />}
                        Confirm password
                    </Button>
                </div>
            </form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
