import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { 
    Calendar, 
    Megaphone, 
    ArrowRight, 
    Clock,
    AlertTriangle,
    Info,
    CheckCircle,
    QrCode,
    MessageSquare,
    Download,
    Maximize2
} from 'lucide-react';
import type { PageProps } from '@/types';

interface Announcement {
    id: number;
    title: string;
    content: string;
    date: string;
    type: 'info' | 'warning' | 'success';
}

interface StudentDashboardProps {
    myOrganizationsCount: number;
    upcomingEventsCount: number;
    announcements: Announcement[];
}

export default function Dashboard({ myOrganizationsCount, upcomingEventsCount, announcements }: StudentDashboardProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const quickActions = [
        { title: 'Announcements', icon: Megaphone, color: 'bg-[#006B3F]/10 text-[#006B3F]' },
        { title: 'Upcoming Events', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
        { title: 'My QR Pass', icon: QrCode, color: 'bg-[#F4C430]/10 text-[#B88E14]' },
        { title: 'My Concerns', icon: MessageSquare, color: 'bg-purple-50 text-purple-600' }
    ];

    const getAnnouncementIcon = (type: Announcement['type']) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />;
            case 'success': return <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />;
            case 'info':
            default: return <Info className="h-5 w-5 text-blue-500 shrink-0" />;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Student Dashboard" />

            <div className="space-y-6">
                {/* Hero Welcome Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-[#004D2C] to-[#006B3F] p-8 shadow-sm text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" className="text-[#F4C430]" />
                        </svg>
                    </div>
                    
                    <div className="z-10 space-y-2">
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            Welcome back, {user.first_name}!
                        </h1>
                        <p className="text-white/80 font-medium">
                            Ready for another great day at Central Philippines State University?
                        </p>
                    </div>
                    
                    <div className="z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl">
                        <div className="h-12 w-12 rounded-full bg-[#F4C430] text-[#004D2C] flex items-center justify-center font-bold text-lg shadow-inner">
                            {user.first_name[0]}{user.last_name[0]}
                        </div>
                        <div>
                            <p className="text-sm font-bold leading-tight">{user.first_name} {user.last_name}</p>
                            <p className="text-xs text-white/70 leading-tight mb-1">{user.student_number || 'ST-2023-0001'}</p>
                            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-[#F4C430]">
                                <span>BSCS</span>
                                <span>•</span>
                                <span>3rd Year</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, idx) => {
                        const Icon = action.icon;
                        return (
                            <button key={idx} className="bg-[#FFFFFF] p-5 rounded-[16px] border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 group cursor-pointer">
                                <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <span className="font-bold text-[#1F2937] text-sm">{action.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column (2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Event Cards Mock */}
                        <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                                <h3 className="font-bold text-[#004D2C] flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    My Upcoming Events
                                </h3>
                                <span className="text-xs font-bold bg-[#006B3F]/10 text-[#006B3F] px-2 py-1 rounded-full">
                                    {upcomingEventsCount} Registered
                                </span>
                            </div>
                            <div className="p-5 space-y-4">
                                {upcomingEventsCount > 0 ? (
                                    <div className="border border-[#E5E7EB] rounded-xl p-4 flex gap-4 hover:border-[#006B3F]/30 transition-colors">
                                        <div className="bg-[#F8FAF9] rounded-lg p-3 text-center min-w-[70px] border border-[#E5E7EB]">
                                            <div className="text-xs font-bold text-[#6B7280] uppercase">Oct</div>
                                            <div className="text-2xl font-extrabold text-[#004D2C]">14</div>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-[#1F2937]">General Assembly 2026</h4>
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-[#006B3F] bg-[#006B3F]/10 px-2 py-0.5 rounded-full">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Registered
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#6B7280]">University Gymnasium • 8:00 AM</p>
                                            <p className="text-xs font-medium text-[#B88E14] mt-2">Mandatory for all CS students</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-[#6B7280] text-center py-4">No upcoming events found.</p>
                                )}
                            </div>
                        </div>

                        {/* Announcement Feed */}
                        <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-[#E5E7EB]">
                                <h3 className="font-bold text-[#004D2C] flex items-center gap-2">
                                    <Megaphone className="h-5 w-5" />
                                    Latest Announcements
                                </h3>
                            </div>
                            <div className="p-5 space-y-4">
                                {announcements.length === 0 ? (
                                    <p className="text-sm text-[#6B7280] text-center py-4">No active announcements.</p>
                                ) : (
                                    announcements.map((ann) => (
                                        <div 
                                            key={ann.id} 
                                            className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E5E7EB] border-l-4 border-l-[#006B3F] flex gap-3 items-start"
                                        >
                                            {getAnnouncementIcon(ann.type)}
                                            <div className="space-y-1 flex-1">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h4 className="font-bold text-[#1F2937] text-sm">{ann.title}</h4>
                                                    <span className="text-[10px] font-bold text-[#6B7280] flex items-center gap-1 shrink-0">
                                                        <Clock className="h-3 w-3" />
                                                        {ann.date}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-[#6B7280] leading-relaxed">{ann.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (1/3) */}
                    <div className="space-y-6">
                        
                        {/* Centered QR Pass Preview Widget */}
                        <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5E7EB] shadow-sm p-6 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#F4C430]"></div>
                            <h3 className="font-bold text-[#004D2C] mb-1">My QR Pass</h3>
                            <p className="text-xs text-[#6B7280] mb-6">Scan for event attendance</p>
                            
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-inner mb-4 inline-block">
                                <QrCode className="h-32 w-32 text-[#1F2937]" strokeWidth={1} />
                            </div>
                            
                            <p className="font-extrabold text-[#1F2937] text-lg">{user.first_name} {user.last_name}</p>
                            <p className="text-sm font-medium text-[#006B3F] mb-6">{user.student_number || 'ST-2023-0001'}</p>
                            
                            <div className="w-full grid grid-cols-2 gap-2">
                                <button className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#006B3F] bg-[#006B3F]/10 rounded-lg hover:bg-[#006B3F]/20 transition-colors">
                                    <Maximize2 className="h-3.5 w-3.5" />
                                    Fullscreen
                                </button>
                                <button className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#004D2C] bg-[#F4C430] rounded-lg hover:bg-yellow-400 transition-colors">
                                    <Download className="h-3.5 w-3.5" />
                                    Download
                                </button>
                            </div>
                        </div>

                        {/* Attendance History */}
                        <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                                <h3 className="font-bold text-[#004D2C] text-sm">Recent Attendance</h3>
                                <button className="text-xs font-bold text-[#006B3F] hover:underline cursor-pointer">View All</button>
                            </div>
                            <div className="divide-y divide-[#E5E7EB]">
                                <div className="p-4 flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#006B3F] shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#1F2937] truncate">IT Week Opening</p>
                                        <p className="text-xs text-[#6B7280]">Oct 10 • 8:30 AM</p>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#006B3F] shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#1F2937] truncate">Organization Fair</p>
                                        <p className="text-xs text-[#6B7280]">Sep 28 • 1:00 PM</p>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center gap-3">
                                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#1F2937] truncate text-red-600">Missed: Seminar</p>
                                        <p className="text-xs text-[#6B7280]">Sep 15</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
