'use client';

import dynamic from 'next/dynamic';
import { Shield, Info, MapPin } from 'lucide-react';
import Link from 'next/link';

// Dynamically import the heatmap component to avoid SSR issues with Leaflet
const HeatmapComponent = dynamic(() => import('@/components/HeatmapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-zinc-950">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-zinc-500">Loading safety heatmap...</div>
            </div>
        </div>
    ),
});

export default function HeatmapPage() {
    return (
        <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
            {/* Header with Public Portal Badge */}
            <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Shield className="w-6 h-6 text-cyan-500" />
                            <h1 className="text-xl font-bold tracking-widest">
                                {'VDMA '}<span className="text-zinc-500">{'//'}</span>{' AI'}
                            </h1>
                        </Link>

                        {/* Public Portal Badge */}
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-cyan-400" />
                                    <div>
                                        <div className="text-xs font-bold text-cyan-400">Citizen Safety Portal</div>
                                        <div className="text-[10px] text-zinc-500">Public View</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-b border-cyan-500/20 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm text-zinc-300">
                            <span className="font-bold text-cyan-400">Real-time Safety Index Map</span> -
                            View crime density and police deployment across the city. Click on zones for detailed information.
                        </p>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
                <HeatmapComponent />

                {/* Legend */}
                <div className="absolute bottom-6 left-6 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl">
                    <h3 className="text-sm font-bold mb-3 text-zinc-100">Safety Index Legend</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <div>
                                <div className="text-xs font-medium text-zinc-100">Safe</div>
                                <div className="text-[10px] text-zinc-500">Score: 80-100</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                            <div>
                                <div className="text-xs font-medium text-zinc-100">Moderate</div>
                                <div className="text-[10px] text-zinc-500">Score: 60-79</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
                            <div>
                                <div className="text-xs font-medium text-zinc-100">Caution</div>
                                <div className="text-[10px] text-zinc-500">Score: 40-59</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            <div>
                                <div className="text-xs font-medium text-zinc-100">High Risk</div>
                                <div className="text-[10px] text-zinc-500">Score: 0-39</div>
                            </div>
                        </div>
                        <div className="border-t border-white/10 pt-2 mt-2">
                            <div className="flex items-center gap-3">
                                <div className="text-xl">🚔</div>
                                <div>
                                    <div className="text-xs font-medium text-zinc-100">Police Units</div>
                                    <div className="text-[10px] text-zinc-500">Active deployment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="absolute top-6 left-6 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl">
                    <h3 className="text-sm font-bold mb-3 text-zinc-100">Live Statistics</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-xs text-zinc-400">Monitored Zones</span>
                            <span className="text-sm font-bold text-cyan-400">8</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-xs text-zinc-400">Police Units</span>
                            <span className="text-sm font-bold text-blue-400">8</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-xs text-zinc-400">Avg. Safety Score</span>
                            <span className="text-sm font-bold text-emerald-400">64/100</span>
                        </div>
                        <div className="border-t border-white/10 pt-2 mt-2">
                            <div className="text-[10px] text-zinc-600">
                                Updated: {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Footer */}
            <footer className="border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl px-6 py-3">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Shield className="w-3 h-3" />
                            <span>Data is anonymized and aggregated for public awareness.</span>
                        </div>
                        <div className="text-xs text-zinc-600">
                            © 2026 VDMA AI - Public Safety Initiative
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
