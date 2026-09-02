import { Head } from '@inertiajs/react';
import {
    Calendar,
    Plus,
    Search,
    Filter,
    MapPin,
    Users,
    CheckCircle2,
    Clock
} from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

export default function Events() {
    const events = [
        { id: 1, title: 'Annual University Leadership Summit', org: 'SSG', date: 'Aug 20, 2026', time: '9:00 AM', venue: 'Main Auditorium', status: 'Approved', attendees: 240 },
        { id: 2, title: 'Campus Hackathon 2026', org: 'CCS', date: 'Sep 05, 2026', time: '8:00 AM', venue: 'IT Computer Lab 1', status: 'Pending Review', attendees: 85 },
        { id: 3, title: 'Freshmen Orientation & Org Fair', org: 'OSSA', date: 'Sep 12, 2026', time: '10:00 AM', venue: 'University Gymnasium', status: 'Approved', attendees: 1200 },
        { id: 4, title: 'ROTC Field Drill Training', org: 'ROTC', date: 'Sep 18, 2026', time: '6:00 AM', venue: 'Grandstand Oval', status: 'Approved', attendees: 450 },
    ];

    return (
        <>
            <Head title="Campus Events - CampusLink" />
            <div className="flex flex-col max-w-7xl mx-auto w-full space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Campus Events Calendar</h1>
                        <p className="text-sm text-gray-600 mt-1">Track, review, and manage upcoming approved campus events.</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors self-start sm:self-auto">
                        <Plus className="w-4 h-4" /> Create Event
                    </button>
                </div>

                {/* Event Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Scheduled</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                            <Calendar className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Approved Events</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">9</p>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Approval</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search event title or organization..."
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
                                    <th className="p-4">Event Title</th>
                                    <th className="p-4">Organization</th>
                                    <th className="p-4">Date & Time</th>
                                    <th className="p-4">Venue</th>
                                    <th className="p-4">Attendees</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {events.map((e) => (
                                    <tr key={e.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="p-4 font-bold text-gray-900">{e.title}</td>
                                        <td className="p-4 font-semibold text-emerald-800">{e.org}</td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-800">{e.date}</div>
                                            <div className="text-[11px] text-gray-400">{e.time}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-gray-700 flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-gray-400" /> {e.venue}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-gray-700 font-medium">
                                                <Users className="w-3.5 h-3.5 text-gray-400" /> {e.attendees}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${e.status === 'Approved'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-medium">
                                            <button className="text-emerald-700 hover:text-emerald-900 hover:underline">Manage</button>
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

Events.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;