import { Link } from '@inertiajs/react';
import { LayoutGrid, Users, FileText, Calendar, UserSearch, Settings, HelpCircle } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, User } from '@/types';

type Props = {
    user: User | null;
    onLogout?: () => void;
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Organizations',
        href: '/admin/organizations',
        icon: Users,
    },
    {
        title: 'Proposals',
        href: '/admin/proposals',
        icon: FileText,
    },
    {
        title: 'Events',
        href: '/admin/events',
        icon: Calendar,
    },
    {
        title: 'Members',
        href: '/admin/members',
        icon: UserSearch,
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

const supportNavItems: NavItem[] = [
    {
        title: 'Support',
        href: '#',
        icon: HelpCircle,
    },
];

export function AppSidebar({ user, onLogout }: Props) {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#00502e] text-white">
            <SidebarHeader className="border-b border-white/10 pb-4 mb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-white/10 text-white">
                            <Link href={dashboard()} prefetch className="flex items-center gap-3">
                                <img
                                    alt="Central Philippines State University Logo"
                                    className="w-10 h-10 rounded-full object-contain bg-white p-0.5"
                                    src="/images/CPSU-LOGO-removebg-preview.png"
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="font-bold text-white text-base">CampusLink</span>
                                    <span className="text-xs text-white/70">OSSA Admin Console</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <NavMain items={mainNavItems} label="Platform" />
            </SidebarContent>

            <SidebarFooter className="border-t border-white/10 pt-2">
                <NavMain items={supportNavItems} />
                <NavUser user={user} onLogout={onLogout} />
            </SidebarFooter>
        </Sidebar>
    );
}
