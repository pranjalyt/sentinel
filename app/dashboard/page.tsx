'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
    LayoutGrid,
    List,
    AlertTriangle,
    ChevronRight,
    Video,
    MapPin,
    Clock,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { mockCameras } from '@/lib/mockData';

// Types
type CameraStatus = 'CRITICAL' | 'WARNING' | 'LIVE';
type ViewMode = 'GRID' | 'FEED';

interface Camera {
    id: number;
    name: string;
    location: string;
    status: CameraStatus;
    threat?: string | null;
    confidence?: number;
    action?: string | null;
    timestamp: string;
}

function SlideToDispatch({ onDispatch }: { onDispatch: () => void }) {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const opacity = useTransform(x, [0, 200], [0.6, 0]);

    const handleDragEnd = () => {
        if (x.get() > 180) {
            onDispatch();
            x.set(0);
        } else {
            x.set(0);
        }
    };

    return (
        <div
            ref={constraintsRef}
            className="relative h-16 rounded-lg bg-gradient-to-r from-red-600 to-red-500 overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity }}
            >
                <span className="text-white font-bold text-sm tracking-wider">
                    SLIDE TO DISPATCH
                </span>
            </motion.div>

            <motion.div
                drag="x"
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x }}
                className="absolute left-1 top-1 bottom-1 w-14 bg-white rounded-md cursor-grab active:cursor-grabbing flex items-center justify-center shadow-lg"
            >
                <ChevronRight className="w-6 h-6 text-red-600" />
            </motion.div>
        </div>
    );
}

export default function VDMADashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>('GRID');
    const [selectedCamera, setSelectedCamera] = useState<Camera>(mockCameras[0]);
    const [dispatched, setDispatched] = useState(false);

    const getStatusColor = (status: CameraStatus) => {
        switch (status) {
            case 'CRITICAL':
                return 'border-red-500 bg-red-500/10';
            case 'WARNING':
                return 'border-amber-500 bg-amber-500/10';
            default:
                return 'border-white/10 bg-zinc-900';
        }
    };

    const getStatusBadge = (status: CameraStatus) => {
        switch (status) {
            case 'CRITICAL':
                return 'bg-red-500 text-white';
            case 'WARNING':
                return 'bg-amber-500 text-black';
            default:
                return 'bg-emerald-500 text-black';
        }
    };

    const handleDispatch = () => {
        setDispatched(true);
        setTimeout(() => setDispatched(false), 3000);
    };

    return (
        <DashboardLayout>
            <div className="flex h-full overflow-hidden">
                {/* MAIN CONTENT */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="border-b border-white/10 p-6 bg-zinc-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Live Operations</h2>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Real-time threat detection and monitoring
                                </p>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg border border-white/10">
                                <button
                                    onClick={() => setViewMode('GRID')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'GRID'
                                        ? 'bg-white/10 text-zinc-100'
                                        : 'text-zinc-500 hover:text-zinc-100'
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                    <span className="text-sm font-medium">Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('FEED')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'FEED'
                                        ? 'bg-white/10 text-zinc-100'
                                        : 'text-zinc-500 hover:text-zinc-100'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                    <span className="text-sm font-medium">Feed</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto p-6">
                        <AnimatePresence mode="wait">
                            {viewMode === 'GRID' ? (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-3 gap-4 h-full"
                                >
                                    {mockCameras.map((camera) => (
                                        <motion.div
                                            key={camera.id}
                                            onClick={() => setSelectedCamera(camera)}
                                            className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${getStatusColor(
                                                camera.status
                                            )} ${camera.status === 'CRITICAL' ? 'animate-pulse-border' : ''
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Video Placeholder */}
                                            <div className="aspect-video bg-black relative flex items-center justify-center">
                                                <Video className="w-12 h-12 text-zinc-700" />
                                                {camera.status === 'CRITICAL' && (
                                                    <div className="absolute top-3 right-3">
                                                        <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
                                                    </div>
                                                )}
                                                {camera.status === 'WARNING' && (
                                                    <div className="absolute top-3 right-3">
                                                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                                                    </div>
                                                )}
                                                {/* Live Indicator */}
                                                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 px-2 py-1 rounded">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                                    <span className="text-xs font-mono text-zinc-300">LIVE</span>
                                                </div>
                                            </div>

                                            {/* Camera Info */}
                                            <div className="p-4 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-mono font-bold text-sm">{camera.name}</h3>
                                                    <span
                                                        className={`text-xs px-2 py-0.5 rounded font-bold ${getStatusBadge(
                                                            camera.status
                                                        )}`}
                                                    >
                                                        {camera.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{camera.location}</span>
                                                </div>
                                                {camera.threat && (
                                                    <div className="text-xs text-red-400 font-medium">
                                                        ⚠ {camera.threat} detected ({camera.confidence}%)
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="feed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-2xl mx-auto space-y-4"
                                >
                                    {[
                                        ...mockCameras.filter((cam) => cam.status !== 'LIVE'),
                                        ...mockCameras.filter((cam) => cam.status === 'LIVE')
                                    ]
                                        .map((camera) => (
                                            <motion.div
                                                key={camera.id}
                                                onClick={() => setSelectedCamera(camera)}
                                                className={`border-2 rounded-lg overflow-hidden cursor-pointer ${getStatusColor(
                                                    camera.status
                                                )}`}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                            >
                                                {/* Video Placeholder */}
                                                <div className="aspect-video bg-black relative flex items-center justify-center">
                                                    <Video className="w-16 h-16 text-zinc-700" />
                                                    {camera.status === 'CRITICAL' && (
                                                        <div className="absolute top-4 right-4">
                                                            <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                                                        </div>
                                                    )}
                                                    {camera.status === 'WARNING' && (
                                                        <div className="absolute top-4 right-4">
                                                            <AlertTriangle className="w-8 h-8 text-amber-500" />
                                                        </div>
                                                    )}
                                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                                        <span className="text-sm font-mono text-zinc-300">LIVE</span>
                                                    </div>
                                                </div>

                                                {/* Incident Details */}
                                                <div className="p-6 space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-mono font-bold text-lg">{camera.name}</h3>
                                                            <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{camera.location}</span>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className={`text-sm px-3 py-1 rounded font-bold ${getStatusBadge(
                                                                camera.status
                                                            )}`}
                                                        >
                                                            {camera.status}
                                                        </span>
                                                    </div>

                                                    {camera.threat && (
                                                        <div className="space-y-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                                            <div className="text-red-400 font-bold">
                                                                ⚠ THREAT DETECTED
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                                <div>
                                                                    <span className="text-zinc-500">Object:</span>
                                                                    <span className="ml-2 text-zinc-100 font-medium">
                                                                        {camera.threat}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-zinc-500">Confidence:</span>
                                                                    <span className="ml-2 text-zinc-100 font-medium">
                                                                        {camera.confidence}%
                                                                    </span>
                                                                </div>
                                                                {camera.action && (
                                                                    <div>
                                                                        <span className="text-zinc-500">Action:</span>
                                                                        <span className="ml-2 text-zinc-100 font-medium">
                                                                            {camera.action}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{camera.timestamp}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT INSPECTOR PANEL */}
                <aside className="w-80 border-l border-white/10 flex flex-col glass-effect">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-lg font-bold">Incident Inspector</h3>
                        <p className="text-xs text-zinc-500 mt-1">Selected: {selectedCamera.name}</p>
                    </div>

                    {/* Video Preview */}
                    <div className="p-4">
                        <div className="aspect-video bg-black rounded-lg relative flex items-center justify-center border border-white/10">
                            <Video className="w-16 h-16 text-zinc-700" />
                            {selectedCamera.status === 'CRITICAL' && (
                                <div className="absolute top-3 right-3">
                                    <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
                                </div>
                            )}
                            <div className="absolute bottom-3 left-3 right-3">
                                <div className="bg-black/80 px-3 py-2 rounded text-xs space-y-1">
                                    <div className="font-mono font-bold">{selectedCamera.name}</div>
                                    <div className="text-zinc-400">{selectedCamera.location}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Telemetry */}
                    <div className="flex-1 p-4 space-y-4 overflow-auto">
                        <div>
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                                Telemetry
                            </h4>
                            <div className="space-y-3">
                                {selectedCamera.threat ? (
                                    <>
                                        <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                                            <div className="text-xs text-zinc-500">Detected Object</div>
                                            <div className="text-lg font-bold text-red-400 mt-1">
                                                {selectedCamera.threat}
                                            </div>
                                            <div className="text-xs text-zinc-400 mt-1">
                                                Confidence: {selectedCamera.confidence}%
                                            </div>
                                        </div>
                                        {selectedCamera.action && (
                                            <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                                                <div className="text-xs text-zinc-500">Action</div>
                                                <div className="text-lg font-bold text-amber-400 mt-1">
                                                    {selectedCamera.action}
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                                            <div className="text-xs text-zinc-500">Location</div>
                                            <div className="text-sm font-medium text-zinc-100 mt-1">
                                                {selectedCamera.location}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-4 bg-zinc-900 rounded-lg border border-white/10 text-center">
                                        <div className="text-emerald-400 font-medium">All Clear</div>
                                        <div className="text-xs text-zinc-500 mt-1">No threats detected</div>
                                    </div>
                                )}

                                <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                                    <div className="text-xs text-zinc-500">Timestamp</div>
                                    <div className="text-sm font-mono text-zinc-100 mt-1">
                                        {selectedCamera.timestamp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Zone */}
                    <div className="p-4 border-t border-white/10 space-y-3">
                        {selectedCamera.status === 'CRITICAL' && (
                            <>
                                {dispatched ? (
                                    <div className="h-16 rounded-lg bg-emerald-600 flex items-center justify-center">
                                        <span className="text-white font-bold">✓ UNIT DISPATCHED</span>
                                    </div>
                                ) : (
                                    <SlideToDispatch onDispatch={handleDispatch} />
                                )}

                                <button className="w-full h-12 rounded-lg border border-white/20 text-zinc-400 hover:bg-white/5 hover:text-zinc-100 transition-colors font-medium">
                                    Mark False Positive
                                </button>
                            </>
                        )}

                        {selectedCamera.status === 'WARNING' && (
                            <button className="w-full h-12 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500/30 transition-colors font-medium">
                                Monitor Closely
                            </button>
                        )}

                        {selectedCamera.status === 'LIVE' && (
                            <div className="text-center text-sm text-zinc-500 py-4">
                                No action required
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </DashboardLayout>
    );
}
