'use client';

import { useEffect, useRef, useState } from 'react';
import { mockCameras, cameraPositions } from '@/lib/mockData';
import { Video, X, AlertTriangle } from 'lucide-react';

export default function MapComponent() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null); // Track the Leaflet map instance
    const [selectedCamera, setSelectedCamera] = useState<typeof mockCameras[0] | null>(null);

    useEffect(() => {
        // Guard: Prevent double initialization in React StrictMode
        if (typeof window === 'undefined' || !mapContainerRef.current) {
            return;
        }

        // Additional guard: Check if container already has a map initialized
        const container = mapContainerRef.current;
        if (container.classList.contains('leaflet-container')) {
            return; // Map already initialized on this DOM element
        }

        // If we have a stale map instance, clean it up
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        // Dynamically import Leaflet only on client side
        import('leaflet').then((L) => {
            // Double-check the container is still available and not initialized
            if (!mapContainerRef.current || mapContainerRef.current.classList.contains('leaflet-container')) {
                return;
            }

            // Fix for default marker icons in Leaflet with webpack
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });

            // Initialize map
            const mapInstance = L.map(mapContainerRef.current!).setView([28.6139, 77.2090], 13);
            mapInstanceRef.current = mapInstance; // Store in ref

            // Dark mode tile layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(mapInstance);

            // Add camera markers
            mockCameras.forEach((camera) => {
                const position = cameraPositions[camera.id];
                if (!position) return;

                // Create custom marker based on status
                const markerColor =
                    camera.status === 'CRITICAL' ? '#ef4444' :
                        camera.status === 'WARNING' ? '#f59e0b' :
                            '#10b981';

                const markerHtml = `
                    <div style="
                        width: 24px;
                        height: 24px;
                        background-color: ${markerColor};
                        border: 3px solid white;
                        border-radius: 50%;
                        box-shadow: 0 0 20px ${markerColor}80;
                        animation: pulse 2s infinite;
                    "></div>
                `;

                const customIcon = L.divIcon({
                    html: markerHtml,
                    className: 'custom-marker',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
                });

                const marker = L.marker(position, { icon: customIcon }).addTo(mapInstance);

                marker.on('click', () => {
                    setSelectedCamera(camera);
                });
            });
        });

        // Cleanup function: Destroy map on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CRITICAL':
                return 'border-red-500 bg-red-500/10';
            case 'WARNING':
                return 'border-amber-500 bg-amber-500/10';
            default:
                return 'border-emerald-500 bg-emerald-500/10';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'CRITICAL':
                return 'bg-red-500 text-white';
            case 'WARNING':
                return 'bg-amber-500 text-black';
            default:
                return 'bg-emerald-500 text-black';
        }
    };

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"
            />
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.1);
                    }
                }
                .custom-marker {
                    background: transparent !important;
                    border: none !important;
                }
            `}</style>

            <div className="relative w-full h-full">
                <div ref={mapContainerRef} className="w-full h-full" />

                {/* Camera Popover */}
                {selectedCamera && (
                    <div className="absolute top-4 right-4 w-80 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h3 className="font-mono font-bold">{selectedCamera.name}</h3>
                                <p className="text-xs text-zinc-500 mt-1">{selectedCamera.location}</p>
                            </div>
                            <button
                                onClick={() => setSelectedCamera(null)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            {/* Video Preview */}
                            <div className="aspect-video bg-black rounded-lg relative flex items-center justify-center border border-white/10">
                                <Video className="w-12 h-12 text-zinc-700" />
                                {selectedCamera.status === 'CRITICAL' && (
                                    <div className="absolute top-2 right-2">
                                        <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/60 px-2 py-1 rounded text-xs">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                    <span className="font-mono text-zinc-300">LIVE</span>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">Status:</span>
                                <span className={`text-xs px-2 py-1 rounded font-bold ${getStatusBadge(selectedCamera.status)}`}>
                                    {selectedCamera.status}
                                </span>
                            </div>

                            {/* Threat Info */}
                            {selectedCamera.threat && (
                                <div className={`p-3 rounded-lg border-2 ${getStatusColor(selectedCamera.status)}`}>
                                    <div className="text-xs text-zinc-500 mb-1">Threat Detected</div>
                                    <div className="text-sm font-bold text-red-400">
                                        {selectedCamera.threat} ({selectedCamera.confidence}%)
                                    </div>
                                    {selectedCamera.action && (
                                        <div className="text-xs text-amber-400 mt-1">
                                            Action: {selectedCamera.action}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Timestamp */}
                            <div className="text-xs text-zinc-500">
                                Last Update: {selectedCamera.timestamp}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
