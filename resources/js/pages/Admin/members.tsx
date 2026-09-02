import { Head } from '@inertiajs/react';
import {
    Search,
    Download,
    Filter,
    UserCheck,
    ShieldCheck,
    Building2
} from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

export default function Members() {
    const members = [
        { id: 1, name: 'Juan Dela Cruz', number: '2026-0001', email: 'juan@cpsu.edu.ph', role: 'Student Member', org: 'CCS', status: 'Active' },
        { id: 2, name: 'Maria Santos', number: '2026-0042', email: 'maria@cpsu.edu.ph', role: 'Officer (President)', org: 'POS', status: 'Active' },
        { id: 3, name: 'Dr. Alex Rivera', number: 'EMP-102', email: 'arivera@cpsu.edu.ph', role: 'Faculty Adviser', org: 'FLP', status: 'Active' },
        { id: 4, name: 'Mark Gomez', number: '2026-0118', email: 'mgomez@cpsu.edu.ph', role: 'Student Member', org: 'ROTC', status: 'Pending' },
    ];

    return (
        <>
            <Head title="Members Directory - CampusLink" />
            <div className="flex flex-col max-w-7xl mx-auto w-full space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Members Directory</h1>
                        <p className="text-sm text-gray-600 mt-1">View and manage registered student members and advisers across all organizations.</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-lg shadow-xs transition-colors self-start sm:self-auto">
                        <Download className="w-4 h-4 text-gray-500" /> Export Directory
                    </button>
                </div>

                {/* Quick Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Active Members</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">1,420</p>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                            <UserCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization Officers</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">84</p>
                        </div>
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Organizations</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">10</p>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                            <Building2 className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Directory Table Card */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search member by name, student ID, or email..."
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                            />
                        </div>
                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 transition-colors">
                            <Filter className="w-3.5 h-3.5" /> Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-gray-600">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="p-4">Member Details</th>
                                    <th className="p-4">Student ID / Code</th>
                                    <th className="p-4">System Role</th>
                                    <th className="p-4">Organization</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {members.map((m) => (
                                    <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">{m.name}</div>
                                            <div className="text-[11px] text-gray-400">{m.email}</div>
                                        </td>
                                        <td className="p-4 font-mono font-medium text-gray-700">{m.number}</td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 font-semibold rounded text-[11px]">
                                                {m.role}
                                            </span>
                                        </td>
                                        <td className="p-4 font-semibold text-emerald-800">{m.org}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${m.status === 'Active'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}>
                                                {m.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-emerald-700 hover:text-emerald-900 font-semibold hover:underline">Edit Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Members.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
