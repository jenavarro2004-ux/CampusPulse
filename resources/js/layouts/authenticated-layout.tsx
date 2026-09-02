import { Link, usePage, useForm } from '@inertiajs/react';
import {
    LayoutDashboard, Users, Calendar, LogOut, Menu, X, Bell, Shield,
    User as UserIcon, Building2, ChevronDown, Settings, Search,
    Megaphone, QrCode, CheckCircle, MessageSquare, LogIn
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { logout, login } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { organizations as adminOrganizations } from '@/routes/admin';
import { index as usersIndex } from '@/routes/admin/users';
import { dashboard as councilDashboard } from '@/routes/council';
import { dashboard as officerDashboard } from '@/routes/officer';
import { index as organizationsIndex } from '@/routes/organizations';
import { dashboard as ossaDashboard } from '@/routes/ossa';
import { edit as profileEdit } from '@/routes/profile';
import { dashboard as studentDashboard } from '@/routes/student';
import type { PageProps } from '@/types';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const { isCurrentOrParentUrl } = useCurrentUrl();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { post } = useForm();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => clearInterval(timer);
    }, []);

    const handleLogout = (e?: React.FormEvent) => {
        if (e) {
e.preventDefault();
}

        post(logout.url());
    };

    const roleConfig: Record<string, { label: string; badgeClass: string }> = {
        admin: { label: 'Administrator', badgeClass: 'bg-role-admin text-white' },
        ossa: { label: 'OSSA Staff', badgeClass: 'bg-role-ossa text-white' },
        council: { label: 'Student Council', badgeClass: 'bg-role-council text-white' },
        officer: { label: 'Club Officer', badgeClass: 'bg-role-officer text-white' },
        student: { label: 'General Student', badgeClass: 'bg-role-student text-white' },
    };

    const currentRole = user ? (roleConfig[user.role] || { label: 'User', badgeClass: 'bg-muted text-white' }) : { label: 'Guest Visitor', badgeClass: 'bg-muted text-white' };

    type NavItem = {
        title: string;
        href?: string;
        icon: React.ElementType;
        active: boolean;
        badge?: string;
        onClick?: (e?: React.FormEvent) => void;
    };

    type NavGroup = {
        label?: string;
        items: NavItem[];
    };

    const getNavGroups = (): NavGroup[] => {
        const getDashboardUrl = () => {
            if (!user) {
return '/';
}

            switch (user.role) {
                case 'admin': return adminDashboard.url();
                case 'student': return studentDashboard.url();
                case 'ossa': return ossaDashboard.url();
                case 'council': return councilDashboard.url();
                case 'officer': return officerDashboard.url();
                default: return '/dashboard';
            }
        };

        const dashboardUrl = getDashboardUrl();
        const orgsUrl = user?.role === 'admin'
            ? adminOrganizations.url()
            : organizationsIndex.url();

        const groups: NavGroup[] = [
            {
                label: 'DASHBOARD',
                items: [
                    { title: user ? 'Overview' : 'Home Portal', href: dashboardUrl, icon: LayoutDashboard, active: isCurrentOrParentUrl(dashboardUrl) }
                ]
            }
        ];

        if (user?.role === 'admin') {
            const usersIndexUrl = usersIndex.url();
            groups.push({
                label: 'USER MANAGEMENT',
                items: [
                    { title: 'All Users', href: usersIndexUrl, icon: Users, active: isCurrentOrParentUrl(usersIndexUrl), badge: 'New' }
                ]
            });
        }

        groups.push({
            label: 'ORGANIZATION MANAGEMENT',
            items: [
                { title: 'Directory & Accreditation', href: orgsUrl, icon: Building2, active: isCurrentOrParentUrl(orgsUrl) }
            ]
        });

        if (user?.role === 'student') {
            groups.push({
                label: 'STUDENT PORTAL',
                items: [
                    { title: 'Dashboard', href: dashboardUrl, icon: LayoutDashboard, active: isCurrentOrParentUrl(dashboardUrl) },
                    { title: 'Announcements', href: '#', icon: Megaphone, active: false },
                    { title: 'Events', href: '#', icon: Calendar, active: false },
                    { title: 'My QR Pass', href: '#', icon: QrCode, active: false },
                    { title: 'Attendance History', href: '#', icon: CheckCircle, active: false },
                    { title: 'My Concerns', href: '#', icon: MessageSquare, active: false },
                ]
            });
        }

        if (user?.role === 'admin') {
            groups.push({
                label: 'SYSTEM AUDIT & ADMIN',
                items: [
                    { title: 'Audit Logs', href: '#', icon: Shield, active: false },
                    { title: 'System Settings', href: '#', icon: Settings, active: false },
                ]
            });
        }

        if (user) {
            groups.push({
                label: 'ACCOUNT',
                items: [
                    { title: 'My Profile', href: profileEdit.url(), icon: UserIcon, active: isCurrentOrParentUrl(profileEdit.url()) },
                    { title: 'Log Out', icon: LogOut, active: false, onClick: handleLogout }
                ]
            });
        } else {
            groups.push({
                label: 'ACCOUNT',
                items: [
                    { title: 'Sign In to Portal', href: login.url(), icon: LogIn, active: false }
                ]
            });
        }

        return groups;
    };

    const navGroups = getNavGroups();

    const renderNavGroups = (isMobile: boolean = false) => {
        return (
            <div className="flex flex-col h-full">
                <nav className="flex-1 py-6 space-y-6 overflow-y-auto scrollbar-hide">
                    {navGroups.map((group) => (
                        <div key={group.label ?? 'primary'} className="space-y-1">
                            {group.label && (
                                <h3 className="px-6 text-[14px] font-semibold text-[#8DA69B] uppercase tracking-wider mb-2">
                                    {group.label}
                                </h3>
                            )}
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const content = (
                                    <>
                                        <Icon className={`h-5 w-5 ${item.active ? 'text-cpsu-gold' : 'text-[#8DA69B]'}`} />
                                        <span className="flex-1 font-medium">{item.title}</span>
                                        {item.badge && (
                                            <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full bg-cpsu-gold text-cpsu-primary-dark">
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                );

                                const className = `flex items-center gap-3 px-6 py-3 text-[16px] transition-all duration-200 ${item.active
                                    ? 'bg-cpsu-primary text-white border-l-4 border-cpsu-gold'
                                    : 'text-[#8DA69B] border-l-4 border-transparent hover:bg-cpsu-primary hover:text-white'
                                    }`;

                                if (item.onClick) {
                                    return (
                                        <button
                                            key={item.title}
                                            onClick={(e) => {
                                                if (isMobile) {
setSidebarOpen(false);
}

                                                item.onClick!(e);
                                            }}
                                            className={`${className} w-full text-left cursor-pointer`}
                                        >
                                            {content}
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.title}
                                        href={item.href || '#'}
                                        className={className}
                                        onClick={() => isMobile && setSidebarOpen(false)}
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background text-text flex">
            <aside className="hidden md:flex flex-col w-[280px] bg-cpsu-primary-dark text-white shrink-0 shadow-lg z-20">
                <div className="h-20 flex items-center px-6 border-b border-[#006B3F] gap-3">
                    <div className="bg-cpsu-gold text-cpsu-primary-dark h-10 w-10 flex items-center justify-center rounded-btn font-bold text-lg shadow-sm">
                        CP
                    </div>
                    <div>
                        <span className="font-bold text-[18px] tracking-tight block leading-tight">CAMPUSPULSE</span>
                        <span className="text-[12px] text-cpsu-gold font-semibold tracking-wide">CPSU PORTAL</span>
                    </div>
                </div>

                {renderNavGroups()}
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative flex flex-col w-[280px] bg-cpsu-primary-dark text-white h-full shadow-2xl">
                        <div className="absolute top-6 right-4">
                            <button onClick={() => setSidebarOpen(false)} className="text-[#8DA69B] hover:text-white cursor-pointer transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="h-20 flex items-center px-6 border-b border-[#006B3F] gap-3">
                            <div className="bg-cpsu-gold text-cpsu-primary-dark h-10 w-10 flex items-center justify-center rounded-btn font-bold text-lg shadow-sm">
                                CP
                            </div>
                            <div>
                                <span className="font-bold text-[18px] tracking-tight block leading-tight">CAMPUSPULSE</span>
                            </div>
                        </div>
                        {renderNavGroups(true)}
                    </aside>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0 bg-background">
                <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-8 shrink-0 shadow-sm relative z-10">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="md:hidden text-muted hover:text-cpsu-primary cursor-pointer" onClick={() => setSidebarOpen(true)}>
                            <Menu className="h-6 w-6" />
                        </button>

                        <div className="hidden md:flex items-center relative w-full max-w-md">
                            <Search className="h-5 w-5 absolute left-3 text-muted" />
                            <input
                                type="text"
                                placeholder="Search students, organizations, or events..."
                                className="w-full pl-10 pr-4 h-[48px] bg-background border border-border rounded-btn text-[14px] focus:outline-none focus:border-cpsu-primary focus:ring-1 focus:ring-cpsu-primary transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                        <div className="hidden lg:block text-[14px] font-medium text-muted">
                            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        <button className="text-muted hover:text-cpsu-primary transition-colors p-2 rounded-full hover:bg-background relative cursor-pointer">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-cpsu-gold rounded-full border-2 border-surface" />
                        </button>

                        <div className="h-8 w-px bg-border" />

                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-3 text-left focus:outline-none cursor-pointer py-1 px-2 rounded-lg hover:bg-muted/5 transition-colors"
                            >
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="font-semibold text-[14px] text-text leading-tight">
                                        {user ? `${user.first_name} ${user.last_name}` : 'Guest Visitor'}
                                    </span>
                                    <span className="text-[12px] font-medium text-cpsu-primary leading-tight">
                                        {currentRole.label}
                                    </span>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-cpsu-primary text-white flex items-center justify-center font-bold text-[14px] shadow-sm border border-cpsu-primary-light">
                                    {user ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}` : 'G'}
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted" />
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                    <div className="absolute right-0 mt-3 w-56 bg-surface border border-border rounded-card shadow-card py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 border-b border-border mb-1">
                                            <p className="text-[12px] text-muted font-semibold uppercase tracking-wider mb-0.5">
                                                {user ? 'Logged in as' : 'Access Mode'}
                                            </p>
                                            <p className="text-[14px] font-semibold text-text truncate">
                                                {user ? user.email : 'Public Guest View'}
                                            </p>
                                        </div>
                                        {user ? (
                                            <>
                                                <Link href={profileEdit.url()} className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-text hover:bg-background transition-colors">
                                                    <UserIcon className="h-4 w-4 text-muted" />
                                                    My Profile
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-[14px] font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer mt-1 border-t border-border"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Log Out
                                                </button>
                                            </>
                                        ) : (
                                            <Link href={login.url()} className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-cpsu-primary hover:bg-background transition-colors">
                                                <LogIn className="h-4 w-4" />
                                                Sign In to Portal
                                            </Link>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
