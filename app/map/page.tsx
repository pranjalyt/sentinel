'use client';

import DashboardLayout from '@/components/DashboardLayout';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-zinc-950">
            <div className="text-zinc-500">Loading map...</div>
        </div>
    ),
});

export default function MapPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col h-full">
                {/* Header */}
                <header className="border-b border-white/10 p-6 bg-zinc-950">
                    <div>
                        <h2 className="text-2xl font-bold">Map View</h2>
                        <p className="text-sm text-zinc-500 mt-1">
                            Geographic distribution of surveillance cameras
                        </p>
                    </div>
                </header>

                {/* Map Container */}
                <div className="flex-1 relative">
                    <MapComponent />
                </div>

                {/* Legend */}
                <div className="border-t border-white/10 p-4 bg-zinc-950">
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            <span className="text-xs text-zinc-400">Critical</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                            <span className="text-xs text-zinc-400">Warning</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-xs text-zinc-400">Live</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
