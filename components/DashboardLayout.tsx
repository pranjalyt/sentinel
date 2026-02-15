'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Map, BarChart3, Cpu, Shield, Home, TrendingUp } from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/dashboard', label: 'Dashboard', icon: Activity },
        { href: '/map', label: 'Map View', icon: Map },
        { href: '/heatmap', label: 'Safety Heatmap', icon: TrendingUp },
        { href: '/analytics', label: 'Analytics', icon: BarChart3 },
        { href: '/system-health', label: 'System Health', icon: Cpu },
    ];

    return (
        <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
            {/* LEFT SIDEBAR */}
            <aside className="w-64 border-r border-white/10 flex flex-col bg-zinc-950">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold tracking-widest flex items-center gap-2">
                        <Shield className="w-6 h-6 text-red-500" />
                        {'VDMA '}<span className="text-zinc-500">{'//'}</span>{' AI'}
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-white/5 border border-white/10 text-zinc-100'
                                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Status */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500">System:</span>
                        <span className="text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                            ONLINE
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500">Latency:</span>
                        <span className="text-zinc-100 font-mono">14ms</span>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
