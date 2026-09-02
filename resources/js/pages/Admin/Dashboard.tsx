import { Head, Link } from '@inertiajs/react';
import { Building2, ClipboardCheck, Users, ArrowUpRight } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { organizations as adminOrganizations } from '@/routes/admin';
import { index as usersIndex } from '@/routes/admin/users';

interface Organization {
    id: number;
    name: string;
    code?: string;
    created_at: string;
}

interface DashboardProps {
    stats?: {
        totalStudents?: number;
        totalOrganizations?: number;
        pendingProposals?: number;
        upcomingEvents?: number;
    };
    recentOrganizations?: Organization[];
}

export default function Dashboard({ stats, recentOrganizations = [] }: DashboardProps) {
    return (
        <>
            <Head title="OSSA Administrator Dashboard - CampusLink" />

            <div className="relative min-h-full flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto space-y-6 w-full">
                {/* Abstract Design Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#9df5bd]/20 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#aef2c4]/20 rounded-full blur-3xl -z-10 pointer-events-none transform -translate-x-1/2 translate-y-1/3"></div>

                {/* Welcome Banner */}
                <section className="bg-gradient-to-r from-[#00502e] to-[#046d40] rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Admin.</h2>
                        <p className="text-sm md:text-base text-white/90 max-w-2xl">
                            You have <strong className="text-[#F4C430]">{stats?.pendingProposals ?? 12} pending proposals</strong> requiring your review today. Overall campus engagement is up 4% this week.
                        </p>
                    </div>
                    <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#F4C430]/15 rounded-full blur-3xl pointer-events-none"></div>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {[
                        { label: 'Total students', value: stats?.totalStudents ?? 0, icon: Users, href: usersIndex.url() },
                        { label: 'Organizations', value: stats?.totalOrganizations ?? 0, icon: Building2, href: adminOrganizations.url() },
                        { label: 'Pending proposals', value: stats?.pendingProposals ?? 0, icon: ClipboardCheck, href: adminOrganizations.url({ query: { status: 'pending' } }) },
                        { label: 'Upcoming events', value: stats?.upcomingEvents ?? 0, icon: ClipboardCheck, href: '#' },
                    ].map(({ label, value, icon: Icon, href }) => (
                        <Link key={label} href={href} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#00502e] hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
                                    <p className="mt-2 text-3xl font-bold text-[#00502e]">{value}</p>
                                </div>
                                <Icon className="h-5 w-5 text-[#F4C430]" />
                            </div>
                            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#00502e] opacity-0 group-hover:opacity-100 transition-opacity">
                                Open section <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                        </Link>
                    ))}
                </section>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column (Approval Queue & Accreditation) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Approval Queue */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Approval Queue</h3>
                                <Link href={adminOrganizations.url({ query: { status: 'pending' } })} className="text-[#00502e] hover:text-[#006b3f] text-sm font-semibold flex items-center gap-1 transition-colors">
                                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {/* Proposal Item 1 */}
                                <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#f1f5ee] hover:bg-[#dfe4dd] transition-colors border border-transparent hover:border-gray-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#abefc1] text-[#2e6f4a] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>festival</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-1">Annual Tech Symposium</h4>
                                            <p className="text-xs text-gray-600 mb-2">Computer Science Society • Submitted 2 hrs ago</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F4C430]/20 text-gray-800 border border-[#F4C430]/30">High Priority</span>
                                        </div>
                                    </div>
                                    <button className="mt-3 sm:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-[#00502e] hover:bg-[#00502e] hover:text-white transition-colors text-xs font-semibold shadow-2xs hover:shadow-sm whitespace-nowrap">
                                        Review
                                    </button>
                                </div>

                                {/* Proposal Item 2 */}
                                <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#f1f5ee] hover:bg-[#dfe4dd] transition-colors border border-transparent hover:border-gray-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#964247] text-[#ffc9c9] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>sports_basketball</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-1">Inter-Collegiate Sports Fest</h4>
                                            <p className="text-xs text-gray-600 mb-2">Sports Council • Submitted 5 hrs ago</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 border border-gray-300">Standard</span>
                                        </div>
                                    </div>
                                    <button className="mt-3 sm:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-[#00502e] hover:bg-[#00502e] hover:text-white transition-colors text-xs font-semibold shadow-2xs hover:shadow-sm whitespace-nowrap">
                                        Review
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Organization Accreditation Table */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Organization Accreditation Status</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="text-gray-600 border-b border-gray-200 bg-[#f1f5ee]/50">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold">Organization</th>
                                            <th className="py-3 px-4 font-semibold">Category</th>
                                            <th className="py-3 px-4 font-semibold">Status</th>
                                            <th className="py-3 px-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentOrganizations.length === 0 ? (
                                            <tr><td colSpan={4} className="py-8 px-4 text-center text-gray-500">No organizations have been registered yet.</td></tr>
                                        ) : recentOrganizations.map((organization) => (
                                            <tr key={organization.id} className="hover:bg-[#f1f5ee]/50 transition-colors">
                                                <td className="py-3.5 px-4 text-gray-900 font-semibold">{organization.name}</td>
                                                <td className="py-3.5 px-4 text-gray-600">{organization.code || 'Campus group'}</td>
                                                <td className="py-3.5 px-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#abefc1] text-[#2e6f4a]">Registered</span></td>
                                                <td className="py-3.5 px-4 text-right"><Link href={adminOrganizations.url()} className="text-[#00502e] hover:text-[#006b3f] p-1 inline-flex" title="Manage organizations"><ArrowUpRight className="h-4 w-4" /></Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Analytics & Executive Revoke Feed) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Campus Engagement Analytics */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-base font-bold text-gray-900 mb-4">Engagement Analytics</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs text-gray-600">Overall Participation Index</span>
                                        <span className="text-sm font-bold text-[#00502e]">78%</span>
                                    </div>
                                    <div className="w-full bg-[#dfe4dd] rounded-full h-2">
                                        <div className="bg-[#00502e] h-2 rounded-full" style={{ width: '78%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs text-gray-600">Event Attendance (MTD)</span>
                                        <span className="text-sm font-bold text-[#296a46]">4,200</span>
                                    </div>
                                    <div className="h-24 w-full bg-[#f1f5ee] rounded-lg flex items-end gap-2 p-2 relative overflow-hidden">
                                        <div className="w-1/6 bg-[#00502e]/40 h-[40%] rounded-t-sm"></div>
                                        <div className="w-1/6 bg-[#00502e]/50 h-[55%] rounded-t-sm"></div>
                                        <div className="w-1/6 bg-[#00502e]/60 h-[45%] rounded-t-sm"></div>
                                        <div className="w-1/6 bg-[#00502e]/70 h-[70%] rounded-t-sm"></div>
                                        <div className="w-1/6 bg-[#00502e]/80 h-[60%] rounded-t-sm"></div>
                                        <div className="w-1/6 bg-[#00502e] h-[85%] rounded-t-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Executive Revoke Feed */}
                        <div className="bg-[#ffdad6]/30 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-[#ffdad6]">
                            <div className="flex items-center gap-2 mb-3 text-[#ba1a1a]">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                <h3 className="text-base font-bold">Executive Revoke Feed</h3>
                            </div>
                            <p className="text-xs text-gray-600 mb-4">Recent critical actions requiring administrative oversight.</p>
                            <div className="space-y-3">
                                <div className="bg-white p-3 rounded-xl border-l-4 border-[#ba1a1a] shadow-2xs text-xs">
                                    <strong className="text-gray-900 block mb-1">Event Cancelled: Midnight Rally</strong>
                                    <span className="text-gray-500">Revoked by Dean of Students (Security Concerns) • 10:45 AM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
