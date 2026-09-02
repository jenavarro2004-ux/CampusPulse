import type { FormEvent, RefObject } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface DeleteUserProps {
    password: string;
    passwordError?: string;
    processing: boolean;
    passwordInputRef: RefObject<HTMLInputElement | null>;
    onPasswordChange: (password: string) => void;
    onCancel: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function DeleteUser({
    password,
    passwordError,
    processing,
    passwordInputRef,
    onPasswordChange,
    onCancel,
    onSubmit,
}: DeleteUserProps) {
    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Delete account"
                description="Delete your account and all of its resources"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            data-test="delete-user-button"
                        >
                            Delete account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources
                            and data will also be permanently deleted. Please
                            enter your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="sr-only"
                                >
                                    Password
                                </Label>

                                <PasswordInput
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => onPasswordChange(e.currentTarget.value)}
                                    ref={passwordInputRef}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />

                                <InputError message={passwordError} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    type="submit"
                                    variant="destructive"
                                    disabled={processing}
                                    data-test="confirm-delete-user-button"
                                >
                                    Delete account
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
