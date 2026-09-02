import { Head, Link, usePage } from '@inertiajs/react';
import { login } from '@/routes';
import { index as organizationsIndex, show as organizationShow } from '@/routes/organizations';
import type { PageProps, Organization } from '@/types';

interface WelcomeProps extends PageProps {
    organizations?: Organization[];
}

function formatOrgCode(code?: string | null): string {
    const normalized = (code ?? '').trim().toUpperCase();

    if (! normalized) {
        return 'SSG';
    }

    const map: Record<string, string> = {
        'TC-H': 'TCH',
        'CPSU-MB': 'CPMB',
        'CPSU MB': 'CPMB',
    };

    if (map[normalized]) {
        return map[normalized];
    }

    return normalized.replace(/[^A-Z0-9]/g, '');
}

export default function Welcome({ organizations = [] }: WelcomeProps) {
    usePage<PageProps>();

    const featuredOrg = organizations[0];
    const gridOrgs = organizations.slice(1);

    return (
        <>
            <Head title="CampusPulse - Empowering Campus Leadership">
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-[#F8FAF8] text-[#181d19] font-body relative min-h-screen flex flex-col selection:bg-[#00502e] selection:text-white">
                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none z-0 bg-[image:linear-gradient(rgba(0,80,46,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,80,46,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                <svg className="absolute top-10 -left-32 w-[600px] h-[600px] text-[#abefc1] opacity-10 -z-10 rotate-12" fill="currentColor" viewBox="0 0 100 100">
                    <polygon points="50,0 100,100 0,100"></polygon>
                </svg>
                <svg className="absolute top-24 -right-32 w-[500px] h-[500px] text-[#006b3f] opacity-6 -z-10 -rotate-12" fill="currentColor" viewBox="0 0 100 100">
                    <polygon points="100,0 100,100 0,100"></polygon>
                </svg>

                {/* TopNavBar */}
                <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
                    <div className="flex justify-between items-center w-full px-8 h-16 max-w-7xl mx-auto">
                        <div className="flex items-center h-12">
                            <img alt="CPSU Logo" className="h-16 w-auto object-contain" src="/images/CPSU-LOGO-removebg-preview.png" />
                        </div>
                        <div className="hidden md:flex gap-8">
                            <Link href={organizationsIndex.url()} className="text-[#3f4941] hover:text-[#00502e] transition-colors font-semibold text-sm">Directory</Link>
                            <Link href="#" className="text-[#3f4941] hover:text-[#00502e] transition-colors font-semibold text-sm">Calendar</Link>
                            <Link href="#" className="text-[#3f4941] hover:text-[#00502e] transition-colors font-semibold text-sm">About</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Intentionally left empty to hide public admin/login links per design */}
                        </div>
                    </div>
                </nav>

                {/* Hero Section (full-bleed with strong branding) */}
                <section className="bg-gradient-to-br from-[#004D2C] to-[#00502e] text-white py-32 px-6 md:px-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[image:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>

                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full border border-white/10 bg-white/5 blur-[1px]" />
                        <div className="absolute left-1/4 top-10 h-40 w-40 rounded-full border border-[#f4c430]/20 bg-[#f4c430]/5" />
                        <div className="absolute right-24 top-20 h-56 w-56 rounded-full border border-white/10 bg-white/5" />
                        <div className="absolute right-12 bottom-14 h-32 w-32 rotate-12 border border-[#f4c430]/20 bg-[#f4c430]/5" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                        <div className="absolute left-16 bottom-10 h-24 w-24 rotate-45 border border-white/10 bg-white/5" />
                        <div className="absolute left-1/2 top-10 h-16 w-16 rounded-full border border-white/15 bg-white/5" />
                        <div className="absolute right-1/3 bottom-24 h-20 w-20 rotate-45 border border-white/10 bg-white/5" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                    </div>

                    <svg className="absolute -top-16 left-0 w-80 h-80 text-[#0b3b24] opacity-20 -z-10 transform rotate-12" fill="currentColor" viewBox="0 0 100 100">
                        <polygon points="0,0 100,0 0,100"></polygon>
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-96 h-96 text-[#0b3b24] opacity-10 -z-10 transform -rotate-6" fill="currentColor" viewBox="0 0 100 100">
                        <polygon points="100,0 100,100 0,100"></polygon>
                    </svg>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="pt-8 flex flex-col items-center">
                            <img src="/images/CPSU-LOGO-removebg-preview.png" alt="CPSU" className="mx-auto h-28 w-auto mb-4" />
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-on-primary drop-shadow-md mx-auto">Empowering Campus Leadership</h1>
                            <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-center mb-12 text-on-primary/90 drop-shadow">Connect, organize, and lead. The central hub for all student organizations, events, and campus governance.</p>

                            <div className="flex items-center justify-center gap-6">
                                <Link href={login()} className="bg-[#F4C430] text-[#002110] font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-body text-body shadow-lg">Sign In to Portal</Link>
                                <Link href={organizationsIndex.url()} className="bg-transparent border border-white/20 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 font-body text-body backdrop-blur-sm">View Directory</Link>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                                <div className="bg-[#063a26]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#0b3b24]/40 shadow-lg text-left">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="material-symbols-outlined text-4xl text-[#F4C430]">groups</span>
                                        <div>
                                            <h3 className="text-2xl font-semibold">10 Active Organizations</h3>
                                            <p className="text-sm text-white/80">Join diverse groups spanning academics to arts.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#063a26]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#0b3b24]/40 shadow-lg text-left">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="material-symbols-outlined text-4xl text-[#F4C430]">event</span>
                                        <div>
                                            <h3 className="text-2xl font-semibold">5 Events Hosted</h3>
                                            <p className="text-sm text-white/80">Discover workshops, socials, and governance meetings.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#063a26]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#0b3b24]/40 shadow-lg text-left">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="material-symbols-outlined text-4xl text-[#F4C430]">how_to_vote</span>
                                        <div>
                                            <h3 className="text-2xl font-semibold">Active Governance</h3>
                                            <p className="text-sm text-white/80">Participate in student government proposals and voting.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Announcements & Upcoming Events Section */}
                <section className="py-12 md:py-16 px-6 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-[#163b2c]">Announcements</h3>
                                <a href="#" className="text-sm text-[#1a5a3a] font-medium">View All</a>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg bg-gray-50">
                                    <div className="text-xs font-semibold text-[#6b8b76] uppercase">Academic</div>
                                    <div className="mt-1 font-semibold">Enrollment for First Semester Now Open</div>
                                    <div className="text-sm text-gray-600 mt-1">Official registration starts today for all colleges...</div>
                                </div>
                                <div className="p-4 border rounded-lg bg-gray-50">
                                    <div className="text-xs font-semibold text-[#6b8b76] uppercase">Campus Life</div>
                                    <div className="mt-1 font-semibold">New Student Lounge Inauguration</div>
                                    <div className="text-sm text-gray-600 mt-1">Join us this Wednesday for the general assembly meeting...</div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-[#163b2c]">Upcoming Events</h3>
                                <a href="#" className="text-sm text-[#1a5a3a] font-medium">Calendar</a>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-[#e6f3ea] rounded-md flex flex-col items-center justify-center text-sm font-bold text-[#0b3b24]">24<br/><span className="text-xs font-normal">OCT</span></div>
                                    <div>
                                        <div className="font-semibold">Acquintance</div>
                                        <div className="text-sm text-gray-600">Cpsu Hinoba-an Campus • 9:00 AM</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-[#e6f3ea] rounded-md flex flex-col items-center justify-center text-sm font-bold text-[#0b3b24]">28<br/><span className="text-xs font-normal">OCT</span></div>
                                    <div>
                                        <div className="font-semibold">Orientation Day</div>
                                        <div className="text-sm text-gray-600">Cpsu Hinoba-an Campus • 9:00 AM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Directory Preview Section */}
                <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full relative z-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#00502e] mb-3">Organization Directory</h2>
                            <p className="text-[#3f4941] text-lg">Discover communities that match your passions.</p>
                        </div>
                        <Link
                            href={organizationsIndex.url()}
                            className="text-[#00502e] hover:text-[#003820] font-bold flex items-center gap-1 bg-[#00502e]/5 px-4 py-2 rounded-lg transition-colors"
                        >
                            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
                        {/* Large Featured Card */}
                        <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#00502e] via-[#0b6e42] to-[#0c4d32] rounded-[24px] shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer border border-gray-200/50">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,196,48,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),transparent_25%)]"></div>
                            <div className="absolute top-6 right-6 w-22 h-22 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-black text-[#F4C430] backdrop-blur-sm shadow-lg">
                                {formatOrgCode(featuredOrg?.code || 'SSG')}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00502e]/95 via-[#00502e]/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="bg-[#F4C430] text-[#002110] px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block shadow-sm">
                                    {formatOrgCode(featuredOrg?.code || 'SSG')}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
                                    {featuredOrg?.name || 'SSG (Student Supreme Government)'}
                                </h3>
                                <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">
                                    {featuredOrg?.description || 'The highest student governing body dedicated to representing student interests and fostering campus unity.'}
                                </p>
                            </div>
                            {featuredOrg && (
                                <Link href={organizationShow.url(featuredOrg.id)} className="absolute inset-0 z-20" aria-label={featuredOrg.name} />
                            )}
                        </div>

                        {/* Bento Grid Items */}
                        {gridOrgs.length > 0 ? (
                            gridOrgs.map((org) => (
                                <div key={org.id} className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1 relative">
                                    <div className="w-16 h-16 bg-[#abefc1]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#00502e]">
                                        {formatOrgCode(org.code)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">{org.name}</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">
                                            {org.description || 'Active student organization contributing to campus life.'}
                                        </p>
                                    </div>
                                    <Link href={organizationShow.url(org.id)} className="absolute inset-0 z-20" aria-label={org.name} />
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-[#abefc1]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#00502e]">CCS</div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">CCS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Supports students in computing, tech innovation, and academic development.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-[#964247]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#7a2d33]">FLP</div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">FLP</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Develops student leadership, responsibility, and community involvement.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-[#006b3f]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#00502e]">POS</div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">POS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Philippine Organization of Students fostering active campus student participation.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-[#006b3f]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#00502e]">ROTC</div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">ROTC</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Develops discipline and leadership through military-oriented training.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-[#dfe4dd]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#3f4941]">ABS</div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">ABS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Promotes agribusiness knowledge, entrepreneurship, and professional growth.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-[#abefc1]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#00502e]">LIGTAS</div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">LIGTAS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Promotes student participation and activities supporting the campus community.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-[#964247]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-lg font-black text-[#7a2d33]">TCH</div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">TC-H</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">The campus student publication providing news and student-centered content.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Mission / Vision / Goals */}
                <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#00502e]">Our Mission, Vision, and Goals</h3>
                        <p className="text-[#3f4941] mt-2">Committed to empowering students through leadership, innovation, and community engagement.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                            <div className="mx-auto w-16 h-16 bg-[#e6f3ea] rounded-full flex items-center justify-center mb-4 text-2xl text-[#00502e]"><span className="material-symbols-outlined text-3xl">visibility</span></div>
                            <h4 className="text-lg font-bold text-[#163b2c] mb-2">Mission</h4>
                            <p className="text-sm text-[#3f4941]">As the leading technology-driven multi-disciplinary university by 2030.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                            <div className="mx-auto w-16 h-16 bg-[#e6f3ea] rounded-full flex items-center justify-center mb-4 text-2xl text-[#00502e]"><span className="material-symbols-outlined text-3xl">assignment</span></div>
                            <h4 className="text-lg font-bold text-[#163b2c] mb-2">Vision</h4>
                            <p className="text-sm text-[#3f4941]">CPSU is committed to producing competent graduates who can generate and extend leading technologies in multi-disciplinary areas beneficial to the community.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                            <div className="mx-auto w-16 h-16 bg-[#e6f3ea] rounded-full flex items-center justify-center mb-4 text-2xl text-[#00502E]"><span className="material-symbols-outlined text-3xl">flag</span></div>
                            <h4 className="text-lg font-bold text-[#163b2c] mb-2">Goals</h4>
                            <p className="text-sm text-[#3f4941]">To provide efficient, quality, technology-driven, and gender-sensitive products and services.</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200/50 py-8 mt-auto relative z-10">
                    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3 text-gray-900 font-semibold text-base">
                            <img src="/images/CPSU-LOGO-removebg-preview.png" alt="CPSU Logo" className="h-8 w-auto object-contain" />
                            <span>CampusPulse</span>
                        </div>
                        <p className="text-sm text-[#3f4941] font-light">
                            &copy; {new Date().getFullYear()} Central Philippines State University. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
