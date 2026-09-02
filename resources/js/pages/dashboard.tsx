import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard - CampusLink" />

            <div className="relative min-h-full flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto space-y-6 w-full">
                {/* Abstract Design Elements / Glowing Gradients */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#006B3F]/10 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#F4C430]/10 rounded-full blur-3xl -z-10 pointer-events-none transform -translate-x-1/2 translate-y-1/3"></div>

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#004D2C] tracking-tight">Admin Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-0.5">Welcome back. Here&apos;s what&apos;s happening across the campus today.</p>
                    </div>
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Students */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-center justify-between group">
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Students</p>
                            <h4 className="text-3xl font-extrabold text-gray-900 mt-1">11</h4>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#006B3F]/10 flex items-center justify-center text-[#006B3F] group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                        </div>
                    </div>

                    {/* Active Events */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-center justify-between group">
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Events</p>
                            <h4 className="text-3xl font-extrabold text-gray-900 mt-1">0</h4>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#F4C430]/20 flex items-center justify-center text-[#D9A70A] group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
                        </div>
                    </div>

                    {/* Organizations */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-center justify-between group">
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Organizations</p>
                            <h4 className="text-3xl font-extrabold text-gray-900 mt-1">9</h4>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#006B3F]/10 flex items-center justify-center text-[#006B3F] group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                        </div>
                    </div>

                    {/* Pending Approvals */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-center justify-between group">
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pending Approvals</p>
                            <h4 className="text-3xl font-extrabold text-gray-900 mt-1">0</h4>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#F4C430]/20 flex items-center justify-center text-[#D9A70A] group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Recent Activities Table (span 8) */}
                    <div className="lg:col-span-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-200/80 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#006B3F]"></span>
                                    Recent Activities
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">Latest student group profile registrations and system updates.</p>
                            </div>
                            <a href="#" className="text-xs font-semibold text-[#006B3F] hover:text-[#004D2C] flex items-center gap-1 transition-colors">
                                View All <span className="material-symbols-outlined text-sm">arrow_outward</span>
                            </a>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left text-sm">
                                <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-[#F8FAF8]">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold text-gray-600">Entity</th>
                                        <th className="py-3 px-4 font-semibold text-gray-600">Type</th>
                                        <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                                        <th className="py-3 px-4 font-semibold text-gray-600 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-[#F8FAF8]/80 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <span className="font-semibold text-gray-900 block">Supreme Student Government</span>
                                            <span className="text-xs text-gray-500 font-medium">SSG</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600 text-xs">Organization Registration</td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-xs text-gray-500 font-medium">Aug 10, 2026</td>
                                    </tr>
                                    <tr className="hover:bg-[#F8FAF8]/80 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <span className="font-semibold text-gray-900 block">College of Computer Studies</span>
                                            <span className="text-xs text-gray-500 font-medium">CCS</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600 text-xs">Organization Registration</td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-xs text-gray-500 font-medium">Aug 10, 2026</td>
                                    </tr>
                                    <tr className="hover:bg-[#F8FAF8]/80 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <span className="font-semibold text-gray-900 block">Future Leaders Program</span>
                                            <span className="text-xs text-gray-500 font-medium">FLP</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600 text-xs">Organization Registration</td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-xs text-gray-500 font-medium">Aug 10, 2026</td>
                                    </tr>
                                    <tr className="hover:bg-[#F8FAF8]/80 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <span className="font-semibold text-gray-900 block">Reserve Officers Training Corps</span>
                                            <span className="text-xs text-gray-500 font-medium">ROTC</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600 text-xs">Organization Registration</td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-xs text-gray-500 font-medium">Aug 10, 2026</td>
                                    </tr>
                                    <tr className="hover:bg-[#F8FAF8]/80 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <span className="font-semibold text-gray-900 block">Agribusiness Society</span>
                                            <span className="text-xs text-gray-500 font-medium">ABS</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600 text-xs">Organization Registration</td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-xs text-gray-500 font-medium">Aug 10, 2026</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Pending Action (span 4) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Quick Actions Card */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-200/80 p-6">
                            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#F4C430]"></span>
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F8FAF8] hover:bg-[#006B3F]/5 transition-all border border-gray-100 hover:border-[#006B3F]/30 text-gray-700 group">
                                    <span className="material-symbols-outlined text-2xl text-[#006B3F] mb-1.5 group-hover:scale-110 transition-transform">qr_code_2</span>
                                    <span className="text-xs font-bold text-gray-800">Generate QR</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F8FAF8] hover:bg-[#006B3F]/5 transition-all border border-gray-100 hover:border-[#006B3F]/30 text-gray-700 group">
                                    <span className="material-symbols-outlined text-2xl text-[#006B3F] mb-1.5 group-hover:scale-110 transition-transform">barcode_scanner</span>
                                    <span className="text-xs font-bold text-gray-800">Scan Code</span>
                                </button>
                            </div>
                            <button className="w-full py-3.5 bg-gradient-to-r from-[#006B3F] to-[#004D2C] hover:from-[#004D2C] hover:to-[#003820] text-white rounded-xl font-bold text-xs tracking-wide uppercase transition-all shadow-[0_4px_15px_rgba(0,107,63,0.25)] flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-base">folder</span> View Organization Directory
                            </button>
                        </div>

                        {/* Pending Action Card */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-200/80 p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 text-gray-900">
                                    <span className="material-symbols-outlined text-[#F4C430] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                    <h3 className="text-sm font-bold">Pending Action</h3>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F4C430]/15 text-[#8F6B00] border border-[#F4C430]/30">0</span>
                            </div>
                            <div className="py-8 my-auto flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#006B3F] flex items-center justify-center mb-3 border border-emerald-100 shadow-2xs">
                                    <span className="material-symbols-outlined text-xl">check_circle</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">You&apos;re all caught up!</p>
                                <p className="text-xs text-gray-500 mt-1 max-w-[200px]">No pending actions required at this moment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};