import { Head, Link, usePage } from '@inertiajs/react';
import { login } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { dashboard as councilDashboard } from '@/routes/council';
import { dashboard as officerDashboard } from '@/routes/officer';
import { dashboard as ossaDashboard } from '@/routes/ossa';
import { index as organizationsIndex, show as organizationShow } from '@/routes/organizations';
import { dashboard as studentDashboard } from '@/routes/student';
import type { PageProps, Organization } from '@/types';

interface WelcomeProps extends PageProps {
    organizations?: Organization[];
}

export default function Welcome({ organizations = [] }: WelcomeProps) {
    const { auth } = usePage<PageProps>().props;

    const dashboardUrl = auth.user
        ? {
              admin: adminDashboard.url(),
              council: councilDashboard.url(),
              officer: officerDashboard.url(),
              ossa: ossaDashboard.url(),
              student: studentDashboard.url(),
          }[auth.user.role]
        : '/dashboard';

    const featuredOrg = organizations[0];
    const gridOrgs = organizations.slice(1, 10);

    return (
        <>
            <Head title="CampusPulse - Empowering Campus Leadership">
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-[#F8FAF8] text-[#181d19] font-body relative min-h-screen flex flex-col selection:bg-[#00502e] selection:text-white">
                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none z-0 bg-[image:linear-gradient(rgba(0,80,46,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,80,46,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                <svg className="absolute top-[800px] -left-32 w-[600px] h-[600px] text-[#abefc1] opacity-20 -z-10 rotate-12" fill="currentColor" viewBox="0 0 100 100">
                    <polygon points="50,0 100,100 0,100"></polygon>
                </svg>
                <svg className="absolute top-[1400px] -right-32 w-[500px] h-[500px] text-[#006b3f] opacity-[0.03] -z-10 -rotate-12" fill="currentColor" viewBox="0 0 100 100">
                    <polygon points="100,0 100,100 0,100"></polygon>
                </svg>

                {/* TopNavBar */}
                <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
                    <div className="flex justify-between items-center w-full px-8 h-16 max-w-7xl mx-auto">
                        <div className="flex items-center h-12">
                            <img alt="CPSU Logo" className="h-12 w-auto object-contain" src="/images/CPSU-LOGO-removebg-preview.png" />
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
                    <svg className="absolute -top-16 left-0 w-80 h-80 text-[#0b3b24] opacity-10 -z-10 transform rotate-12" fill="currentColor" viewBox="0 0 100 100">
                        <polygon points="0,0 100,0 0,100"></polygon>
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-96 h-96 text-[#0b3b24] opacity-6 -z-10 transform -rotate-6" fill="currentColor" viewBox="0 0 100 100">
                        <polygon points="100,0 100,100 0,100"></polygon>
                    </svg>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center pt-8">
                            <img src="/images/CPSU-LOGO-removebg-preview.png" alt="CPSU" className="mx-auto h-16 w-auto mb-6" />
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">Empowering Campus Leadership</h1>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">Connect, organize, and lead. The central hub for all student organizations, events, and campus governance.</p>

                            <div className="flex items-center justify-center gap-4">
                                <Link href={login()} className="bg-[#F4C430] text-[#002110] font-semibold py-3 px-6 rounded-full shadow-md hover:opacity-95 transition">Sign in to Portal</Link>
                                <Link href={organizationsIndex.url()} className="border border-[#1a5a3a] text-white font-semibold py-3 px-6 rounded-full bg-transparent hover:bg-[#0b3b24]/10 transition">View Directory</Link>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
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
                                    <div className="mt-1 font-semibold">Enrollment for Second Semester Now Open</div>
                                    <div className="text-sm text-gray-600 mt-1">Official registration starts today for all colleges...</div>
                                </div>
                                <div className="p-4 border rounded-lg bg-gray-50">
                                    <div className="text-xs font-semibold text-[#6b8b76] uppercase">Campus Life</div>
                                    <div className="mt-1 font-semibold">New Student Lounge Inauguration</div>
                                    <div className="text-sm text-gray-600 mt-1">Join us this Friday for the ribbon-cutting ceremony...</div>
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
                                        <div className="font-semibold">Tech Innovation Summit 2024</div>
                                        <div className="text-sm text-gray-600">Main Auditorium • 9:00 AM</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-[#e6f3ea] rounded-md flex flex-col items-center justify-center text-sm font-bold text-[#0b3b24]">28<br/><span className="text-xs font-normal">OCT</span></div>
                                    <div>
                                        <div className="font-semibold">University Foundation Day</div>
                                        <div className="text-sm text-gray-600">Campus Grounds • All Day</div>
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
                        <div className="md:col-span-2 md:row-span-2 bg-white rounded-[24px] shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer border border-gray-200/50">
                            <div
                                className="absolute inset-0 bg-cover bg-center w-full h-full opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                                style={{
                                    backgroundImage: `url('${featuredOrg?.logo || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDRnpSMBTPs1HD8PDCz4j8MnplUiBD_wtsvQLW2JYQws7TnMi_TLlpBssrTfEXgHStIYZkfZ_H4x8cA3sdeeOplClwpuKehGrj_3l0pQVxxnIVkd3ajf3OSn7a5jc-pZI3aHkEbcEWttvJFHVREhGaQR7ORo4YfCT4-MPl3wv0GP3Frdk2Lx6gG0hZrg2wwXoUTcWZhTAtLhp5BzJLVdiQ2bpqFf0fqJI96oZRadMk1k8go7k1DpDfAbYsJqrpZnBT5Q"}')`
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00502e]/95 via-[#00502e]/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="bg-[#F4C430] text-[#002110] px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block shadow-sm">
                                    {featuredOrg?.code || 'Leadership'}
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
                                    <div className="w-14 h-14 bg-[#abefc1]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        {org.logo ? (
                                            <img src={org.logo} alt={org.name} className="w-full h-full object-contain rounded-xl" />
                                        ) : (
                                            <span className="material-symbols-outlined text-2xl text-[#00502e]">groups</span>
                                        )}
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
                                    <div className="w-14 h-14 bg-[#abefc1]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        <img alt="CCS Logo" className="w-full h-full object-contain rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkB3RKAUkzg8kF9usnxSilfiPsgZaxFG-7ZJVrj26nRG3n1Bhpveqdjm-pHwG_JPP_yZJL9b_F7NLsN8tmQwRh7Rmi2Lxfr-A-kl13HrpwlHC3e3nZfFge7dP0oHUaQ2dTXzcHy1DV6k2vLt1ReJMPn3PDDqH4rWspG5C6zIXUjTs4UfrWL_uLnlFjWl7c4LmGBYTGnyPIyTI2xBkxYHJRMPY3-iS87cvStBMsifDOqFTZzOW496a_1grZiBHwaJP4lg" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">CCS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Supports students in computing, tech innovation, and academic development.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-[#964247]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        <img alt="FLP Logo" className="w-full h-full object-contain rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7KkECByBiCBr_f-SPwi_VNyL9sst7sgtA3hScT-qfiIca1RSvMt9t9nnTgzlC7dMlVJ6D1Fl6Mq4vVhFv7W2oKd8IOy0IMO9KXmdUOqC4WNCCLuP_Vx__rZdxTOgnb7fOUD2OEGD5SWSdU8c3YVrbCKbMJYpjKMDSvbBHsJPXIut94AorZpGQaILtiLElMEyHbh_IFR91GpjFTxnmyD8UhCL4Iwg_HhK9lIlanhcxtmCeyKw3GJhMnypuhVm7Dcvh7Q" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">FLP</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Develops student leadership, responsibility, and community involvement.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-[#006b3f]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        <img alt="POS Logo" className="w-full h-full object-contain rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8GuOkxQsNFgkuTXjP6Xi9Amian10O_zL2I4YCPsRLUBO-cZxIqnYZMVjPCS9uSyk7QTMf6Hoh1f-iMrQ69OhAYNkSxmonCUeEpwT_kuxYbmrcm2TE9VZpDO51dJxwuCTSEbfSnYeooNUsdMeq_ha6H6lhjTlagqlk9GXwUfNw0UlTnKn6J8cSWK07VGBQtGOYa_hcSIJ62NUtsJGE-kd2PxtWqKmTHsbLYc5ylV3VmYFQAouFk4ktrQJTZhCjs2D4Ng" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">POS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Philippine Organization of Students fostering active campus student participation.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-[#006b3f]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        <img alt="ROTC Logo" className="w-full h-full object-contain rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8GuOkxQsNFgkuTXjP6Xi9Amian10O_zL2I4YCPsRLUBO-cZxIqnYZMVjPCS9uSyk7QTMf6Hoh1f-iMrQ69OhAYNkSxmonCUeEpwT_kuxYbmrcm2TE9VZpDO51dJxwuCTSEbfSnYeooNUsdMeq_ha6H6lhjTlagqlk9GXwUfNw0UlTnKn6J8cSWK07VGBQtGOYa_hcSIJ62NUtsJGE-kd2PxtWqKmTHsbLYc5ylV3VmYFQAouFk4ktrQJTZhCjs2D4Ng" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">ROTC</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Develops discipline and leadership through military-oriented training.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-[#dfe4dd]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        <img alt="ABS Logo" className="w-full h-full object-contain rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaIxqhGYiKfOnLEhZKkZBfAWQqLrXpR_I6vSWv54r36Jq9SFa5ETyiAm8jxeDdA6i1_N52FR3Ol-kcd1Nqm5yZ3vcYBWE-jrHqMc_jgYPe68heXUTFNS9BO5YTJnzoXWFkOdgG1vvUVWRRD470wXtFXKPPNU9rs0W5gCdue0_EAgYlVmUSA1DQEgiw2J95ZFqnHHfbAT4MnMxsviiOjzrH5areiapzwu-3wPz7rT5VmmyuFfTDJ6s4Yhe-HwAzAfAGmQ" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">ABS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Promotes agribusiness knowledge, entrepreneurship, and professional growth.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-[#abefc1]/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        <img alt="LIGTAS Logo" className="w-full h-full object-contain rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQS0na6OmJLygqGqHCK10avoC0zOnpOMrWUn6-RPmi5pOgcKzCvMiv3ljr_OeqS7Srb7VBOxBf_xLym76uWbxQdEPLwgb1Yq9HXBIQPDraTO2XD-8_JAQ7uwQdFieU-Lq0SUvImlyDVl_J1g_LsAMSKJiJNoMw0Ufz7nnXofcluYBMWPkQGcsCWy_mkHXIMCq05M46nNns3Sz1MIsW9qHRlCo9r1Q-bdEzwo0DNGED_MWqDybifw1VHOa6a3gOHEEQKQ" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">LIGTAS</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">Promotes student participation and activities supporting the campus community.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200/50 cursor-pointer group hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-[#964247]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2">
                                        <img alt="TC-H Logo" className="w-full h-full object-contain rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgDMR8TwUgkweshCUoW5t6xm-WTJBj107WSccEaHIPRtSEFKVVteaW9Srxh4oJlzvAFNVSz_flvqzCV_g5BQJMc5VeKXi7PzrOfdwsJAqLBrIoVnoYiWuvYp-OkaGBLvcfNCDDcqQdaCSoNTRiYWqJoeYObuGHs_TexE2nfn4G7rAidcmLMobbjwsrAt7mAC_KZdojWyQ0M66iHuVtzmAzMvbiNmV-O3dSC6k4Yhf2EiYhbVi3b8Tc8TK06nV5Z4Dg4Q" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#00502e] transition-colors">TC-H</h4>
                                        <p className="text-sm text-[#3f4941] leading-relaxed line-clamp-3">The campus student publication providing news and student-centered content.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200/50 py-8 mt-auto relative z-10">
                    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3 text-gray-900 font-semibold text-base">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFeKkleGGLHDuif477zfL1ke87gfj-DyDstvkwXoj6FfoQPlEmyGYrAwT6z1_CrhkWhegStEj_wMsUWmRuBZ1l_uP-FpuiYu6f2Qe1bJz4nBfbmalK23KtapAW78Mu3VvXc_hRC1ObYg9HLhh8QSMYTQfpt2ZDNVDGPBlgtHwk5uEAjANprca58FZpx6Rue65hJyWNzK7znXRu490aoOUcLNnOuoTJ3G2s8KEWS-yCJWp3-9-l__15NGbolw2dh8dSWA" alt="CPSU Logo" className="h-8 w-auto object-contain" />
                            <span>CampusLink</span>
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