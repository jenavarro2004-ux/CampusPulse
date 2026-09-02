import { Head } from '@inertiajs/react';
import {
    FileCheck,
    Building2,
    CalendarCheck,
    ShieldCheck,
    ArrowUpRight,
    Clock,
    CheckCircle
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function OssaDashboard() {
    const stats = [
        { label: 'Pending Endorsements', value: '4', icon: FileCheck, color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { label: 'Active Organizations', value: '10', icon: Building2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { label: 'Event Permits Due', value: '6', icon: CalendarCheck, color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { label: 'Compliance Rate', value: '98%', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    ];

    const pendingProposals = [
        { id: 1, name: 'Philippine Organization of Students (POS)', code: 'POS', type: 'Accreditation Renewal', submitted: '2 hours ago' },
        { id: 2, name: 'Society of Computer Science (SCS)', code: 'SCS', type: 'Event Proposal: Hackathon', submitted: 'Yesterday' },
        { id: 3, name: 'College of Agriculture Guild (CAG)', code: 'CAG', type: 'Budget Approval', submitted: '3 days ago' },
    ];

    return (
        <>
            <Head title="OSSA Dashboard - CampusLink" />
            <div className="flex flex-col p-6 max-w-7xl mx-auto w-full space-y-6">
                {/* Banner */}
                <div className="bg-emerald-800 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Office of Student Services & Affairs (OSSA)</h1>
                        <p className="text-emerald-100 text-xs mt-1">
                            Central platform for endorsing organization proposals, event permits, and accreditation management.
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs">
                        Review Endorsements <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Executive Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((s) => {
                        const Icon = s.icon;

                        return (
                            <div key={s.label} className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
                                <div>
                                    <p className="text-gray-500 text-xs font-medium">{s.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl border ${s.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Priority Queue Card */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <h2 className="text-sm font-bold text-gray-800">Pending Endorsement Requests</h2>
                        </div>
                        <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                            Action Required
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {pendingProposals.map((item) => (
                            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-xs text-emerald-800 shrink-0">
                                        {item.code}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-900">{item.name}</div>
                                        <div className="text-[11px] text-gray-500">{item.type} • Submitted {item.submitted}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                    <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        View Details
                                    </button>
                                    <button className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1">
                                        <CheckCircle className="w-3.5 h-3.5" /> Endorse
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

OssaDashboard.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'OSSA Dashboard', href: '#' }]}>{page}</AppLayout>
);
