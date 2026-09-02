import { Link, usePage } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="min-h-screen w-full font-sans text-gray-900 bg-[#004D2C] antialiased flex flex-col md:flex-row relative overflow-hidden">
            {/* Immersive Geometric Grid & Gradients Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }}
                ></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#006b3f] opacity-30 blur-[120px] -translate-y-1/3 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#00502e] opacity-40 blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
            </div>

            {/* Left Brand Area */}
            <div className="relative z-10 hidden md:flex md:w-[55%] flex-col justify-between p-12 lg:p-20 text-white">
                {/* Top Brand Header */}
                <div className="flex items-center gap-3">
                    <img
                        alt="CPSU Logo"
                        className="w-14 h-14 object-contain"
                        src="/images/CPSU-LOGO-removebg-preview.png"
                    />
                    <span className="text-2xl font-bold tracking-tight">{name || 'CampusPulse'}</span>
                </div>

                {/* Main Typography & Content */}
                <div className="my-auto">
                    <img
                        alt="CPSU Official Logo"
                        className="w-36 h-36 object-contain mb-8 drop-shadow-2xl"
                        src="/images/CPSU-LOGO-removebg-preview.png"
                    />
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-xl leading-[1.1]">Empowering Campus Governance.</h1>
                    <p className="text-lg text-white/90 font-normal max-w-md mb-8">Central Philippines State University – Hinoba-an Campus</p>
                    <blockquote className="text-center text-white/90 italic text-base max-w-lg mx-auto">
                        "Empowering the leaders of tomorrow through innovation and community."
                    </blockquote>
                </div>
                <div></div>
            </div>

            {/* Right Form Area */}
            <div className="relative z-20 flex md:w-[45%] flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-12 w-full">
                {/* Mobile Header (Hidden on Desktop) */}
                <div className="md:hidden flex flex-col items-center mb-8 relative z-10 text-white">
                    <Link href={home()} className="flex items-center gap-2 mb-2">
                        <img
                            alt="CPSU Logo"
                            className="w-12 h-12 object-contain"
                            src="/images/CPSU-LOGO-removebg-preview.png"
                        />
                        <span className="text-xl font-bold">{name || 'CampusLink'}</span>
                    </Link>
                    <p className="text-sm text-white/80 text-center">Central Philippines State University</p>
                </div>

                {/* Expanded Elevated Card Container */}
                <div className="w-full max-w-[420px] bg-white p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    {(title || description) && (
                        <div className="text-center mb-8">
                            {title && <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>}
                            {description && <p className="text-sm text-gray-600">{description}</p>}
                        </div>
                    )}

                    {children}
                </div>
            </div>
            {/* Mount Toaster inside the Inertia layout so usePage in useFlashToast is valid */}
            <Toaster />
        </div>
    );
}