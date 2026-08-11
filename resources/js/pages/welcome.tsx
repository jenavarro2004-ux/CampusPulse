import { Head, Link, usePage } from '@inertiajs/react';
import { Building2, FileText, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';
import { home, login } from '@/routes';
import { index as organizationsIndex, show as organizationShow } from '@/routes/organizations';
import type { PageProps, Organization } from '@/types';

interface WelcomeProps extends PageProps {
    organizations?: Organization[];
}

export default function Welcome({ organizations = [] }: WelcomeProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Welcome to CampusPulse" />

            <div className="min-h-screen flex flex-col bg-background">
                {/* Header Navigation Bar */}
                <header className="bg-surface text-text border-b border-border sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/Cpsu-logo.png"
                                alt="CPSU Logo"
                                className="h-10 w-10 rounded-full object-cover shadow-sm border border-cpsu-gold/30"
                            />
                            <span className="font-bold text-base md:text-xl tracking-tight text-cpsu-primary-dark">
                                CampusPulse
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6 font-semibold text-[16px] text-muted">
                            <Link href={home()} className="hover:text-cpsu-primary transition-colors">Home</Link>
                            <a href="#features" className="hover:text-cpsu-primary transition-colors">About</a>
                            <Link href={organizationsIndex.url()} className="hover:text-cpsu-primary transition-colors">Announcements</Link>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-grow">
                    <div className="bg-gradient-to-b md:bg-gradient-to-r from-cpsu-primary-dark to-cpsu-primary relative overflow-hidden">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10 text-center">
                            <h1 className="text-[40px] md:text-[56px] font-bold text-white tracking-tight mb-6 leading-tight">
                                Central Philippines State University <br className="hidden md:block" />
                                <span className="text-cpsu-gold">- CampusPulse</span>
                            </h1>
                            <p className="text-[18px] text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
                                Centralized Student Organization Management, Event Approvals & Attendance System
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href={organizationsIndex.url()}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-[48px] bg-cpsu-primary text-white font-semibold rounded-btn hover:bg-cpsu-primary-dark transition-all duration-200 shadow-card hover:shadow-hover hover:-translate-y-1 border border-cpsu-primary"
                                >
                                    <Building2 className="h-5 w-5" />
                                    Explore Organizations
                                </Link>

                                {!auth.user && (
                                    <Link
                                        href={login()}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-[48px] bg-cpsu-gold text-cpsu-primary-dark font-semibold rounded-btn hover:bg-yellow-400 transition-all duration-200 shadow-card hover:shadow-hover hover:-translate-y-1"
                                    >
                                        Student & Staff Login
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Public Active Organizations Section */}
                    <div id="organizations" className="py-20 bg-surface border-b border-border">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                                <div>
                                    <h2 className="text-[32px] font-semibold text-cpsu-primary-dark tracking-tight">
                                        Active Student Organizations
                                    </h2>
                                    <p className="text-muted text-[16px]">Explore official registered student groups at CPSU.</p>
                                </div>
                                <Link
                                    href={organizationsIndex.url()}
                                    className="inline-flex items-center gap-1 text-sm font-bold text-cpsu-primary hover:text-cpsu-primary-dark transition-colors"
                                >
                                    View All Directory <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(!organizations || organizations.length === 0) ? (
                                    <div className="col-span-full py-12 text-center text-muted bg-background rounded-card border border-border shadow-card">
                                        No active organizations published yet.
                                    </div>
                                ) : (
                                    organizations.map((org) => (
                                        <div key={org.id} className="bg-background p-8 rounded-card shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-200 border border-border flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-muted uppercase tracking-wider">{org.code}</span>
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cpsu-primary/10 text-cpsu-primary border border-cpsu-primary/20">
                                                        <CheckCircle2 className="h-3 w-3" /> Active
                                                    </span>
                                                </div>
                                                <h3 className="text-[20px] font-semibold text-text">{org.name}</h3>
                                                <p className="text-muted leading-relaxed text-[15px] line-clamp-2">
                                                    {org.description || 'Official student organization at Central Philippines State University.'}
                                                </p>
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                                                <Link
                                                    href={organizationShow.url(org.id)}
                                                    className="text-xs font-bold text-cpsu-primary hover:text-cpsu-primary-dark transition-colors inline-flex items-center gap-1"
                                                >
                                                    View Profile <ArrowRight className="h-3.5 w-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div id="features" className="py-24 bg-background">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-[32px] font-semibold text-cpsu-primary-dark tracking-tight">
                                    Everything you need in one platform
                                </h2>
                                <p className="text-muted text-[16px] mt-2">Built specifically for CPSU to streamline student activities and administration.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-surface p-8 rounded-card shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-200 border border-border">
                                    <div className="w-12 h-12 bg-cpsu-primary/10 rounded-xl flex items-center justify-center mb-6">
                                        <Building2 className="h-6 w-6 text-cpsu-primary" />
                                    </div>
                                    <h3 className="text-[24px] font-semibold text-text mb-3">Organization Directory</h3>
                                    <p className="text-muted leading-relaxed text-[16px]">
                                        Browse official clubs, councils, and groups. Submit proposals for new organizations and manage rosters efficiently.
                                    </p>
                                </div>

                                <div className="bg-surface p-8 rounded-card shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-200 border border-border">
                                    <div className="w-12 h-12 bg-cpsu-gold/10 rounded-xl flex items-center justify-center mb-6">
                                        <FileText className="h-6 w-6 text-cpsu-gold" />
                                    </div>
                                    <h3 className="text-[24px] font-semibold text-text mb-3">3-Tier Event Proposals</h3>
                                    <p className="text-muted leading-relaxed text-[16px]">
                                        Submit event proposals and budgets digitally. Get real-time status updates and fast 3-tier approvals from OSSA.
                                    </p>
                                </div>

                                <div className="bg-surface p-8 rounded-card shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-200 border border-border">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                        <QrCode className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-[24px] font-semibold text-text mb-3">QR Attendance Pass</h3>
                                    <p className="text-muted leading-relaxed text-[16px]">
                                        Seamless event tracking with QR code scanning. Generate auditable attendance reports instantly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-surface border-t border-border py-8 mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-cpsu-primary-dark font-semibold text-[16px]">
                            <img src="/images/Cpsu-logo.png" alt="CPSU Logo" className="h-6 w-6 rounded-full object-cover" />
                            <span>CampusPulse</span>
                        </div>
                        <p className="text-[14px] font-normal text-muted">
                            &copy; {new Date().getFullYear()} Central Philippines State University. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}