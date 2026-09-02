import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { PageProps } from '@/types';

interface Actor {
    id: number;
    name: string;
    email: string;
}

interface AuditLogEntry {
    id: number;
    action: string;
    target_type: string | null;
    target_id: number | null;
    ip_address: string | null;
    properties: Record<string, unknown>;
    created_at: string;
    actor: Actor | null;
}

interface AuditLogsPageProps extends PageProps {
    logs: {
        data: AuditLogEntry[];
        current_page: number;
        total: number;
    };
}

export default function AuditLogsIndex({ logs }: AuditLogsPageProps) {
    return (
        <>
            <Head title="Audit Logs" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-8">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00502e]/70">Admin</p>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900">Audit Logs</h1>
                    </div>

                    <Link
                        href="/admin/dashboard"
                        className="rounded-lg border border-[#00502e]/20 bg-white px-4 py-2 text-sm font-semibold text-[#00502e] shadow-sm transition hover:border-[#00502e] hover:bg-[#00502e] hover:text-white"
                    >
                        Back to dashboard
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-700">
                            <thead className="bg-[#f1f5ee] text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Timestamp</th>
                                    <th className="px-4 py-3 font-semibold">Actor</th>
                                    <th className="px-4 py-3 font-semibold">Action</th>
                                    <th className="px-4 py-3 font-semibold">Target</th>
                                    <th className="px-4 py-3 font-semibold">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {logs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                                            No recent admin activity has been recorded.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-gray-900">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                {log.actor ? (
                                                    <div>
                                                        <p className="font-medium text-gray-900">{log.actor.name}</p>
                                                        <p className="text-xs text-gray-500">{log.actor.email}</p>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500">System</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-[#00502e]">
                                                {log.action.replace(/_/g, ' ')}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="space-y-1">
                                                    <p className="font-medium text-gray-900">{log.target_type ?? '—'}</p>
                                                    <p className="text-xs text-gray-500">#{log.target_id ?? 'n/a'}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{log.ip_address ?? '—'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

AuditLogsIndex.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
