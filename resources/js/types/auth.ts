export type UserRole = 'admin' | 'ossa' | 'council' | 'officer' | 'student';

export interface User {
    id: number;
    name: string; // Maintain compatibility with existing components
    student_number: string | null;
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
    is_active: boolean;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type Auth = {
    user: User;
};

/* @chisel-passkeys */
export type Passkey = {
    id: number;
    name: string;
    authenticator: string | null;
    created_at_diff: string;
    last_used_at_diff: string | null;
};
/* @end-chisel-passkeys */
