'use client';

import { useEffect, useRef, useState } from 'react';
import { heatmapZones, policeUnits, getSafetyColor, getSafetyLevel, HeatmapZone, PoliceUnit } from '@/lib/heatmapData';
import { Shield, X, AlertTriangle, Users, TrendingUp } from 'lucide-react';

export default function HeatmapComponent() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const [selectedZone, setSelectedZone] = useState<HeatmapZone | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<PoliceUnit | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !mapContainerRef.current) {
            return;
        }

        const container = mapContainerRef.current;
        if (container.classList.contains('leaflet-container')) {
            return;
        }

        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        import('leaflet').then((L) => {
            if (!mapContainerRef.current || mapContainerRef.current.classList.contains('leaflet-container')) {
                return;
            }

            // Fix for default marker icons
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });

            // Initialize map centered on Delhi
            const mapInstance = L.map(mapContainerRef.current!).setView([28.6139, 77.2090], 13);
            mapInstanceRef.current = mapInstance;

            // Dark topographical tile layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(mapInstance);

            // Add heatmap zones (circles)
            heatmapZones.forEach((zone) => {
                const color = getSafetyColor(zone.safetyScore);

                // Create circle for the zone
                const circle = L.circle(zone.center, {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.3,
                    radius: zone.radius,
                    weight: 2
                }).addTo(mapInstance);

                // Add click event
                circle.on('click', () => {
                    setSelectedZone(zone);
                    setSelectedUnit(null);
                });

                // Add hover tooltip
                circle.bindTooltip(
                    `<div style="text-align: center;">
                        <strong>${getSafetyLevel(zone.safetyScore)}</strong><br/>
                        Safety Score: ${zone.safetyScore}/100
                    </div>`,
                    { permanent: false, direction: 'top' }
                );
            });

            // Add police unit markers
            policeUnits.forEach((unit) => {
                const statusColor =
                    unit.status === 'active' ? '#3b82f6' :
                        unit.status === 'responding' ? '#f59e0b' :
                            '#6b7280';

                const markerHtml = `
                    <div style="
                        width: 24px;
                        height: 24px;
                        background-color: ${statusColor};
                        border: 3px solid white;
                        border-radius: 50%;
                        box-shadow: 0 0 15px ${statusColor}80;
                    "></div>
                `;

                const policeIcon = L.divIcon({
                    html: markerHtml,
                    className: 'police-marker',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
                });

                const marker = L.marker(unit.position, { icon: policeIcon }).addTo(mapInstance);

                marker.on('click', () => {
                    setSelectedUnit(unit);
                    setSelectedZone(null);
                });

                marker.bindTooltip(
                    `<div style="text-align: center;">
                        <strong>${unit.unitName}</strong><br/>
                        ${unit.officers} Officers<br/>
                        Status: ${unit.status.toUpperCase()}
                    </div>`,
                    { permanent: false, direction: 'top' }
                );
            });
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"
            />
            <style jsx global>{`
                .police-marker {
                    background: transparent !important;
                    border: none !important;
                }
                .leaflet-tooltip {
                    background-color: rgba(24, 24, 27, 0.95) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    color: #fafafa !important;
                    border-radius: 8px !important;
                    padding: 8px 12px !important;
                    font-size: 12px !important;
                }
            `}</style>

            <div className="relative w-full h-full">
                <div ref={mapContainerRef} className="w-full h-full z-0" />

                {/* Zone Details Popover */}
                {selectedZone && (
                    <div className="absolute top-4 right-4 w-96 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: getSafetyColor(selectedZone.safetyScore) }}
                                />
                                <div>
                                    <h3 className="font-bold">Zone #{selectedZone.id}</h3>
                                    <p className="text-xs text-zinc-500">Safety Analysis</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedZone(null)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Safety Score */}
                            <div className="p-4 bg-zinc-950 rounded-lg border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-zinc-400">Safety Score</span>
                                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black" style={{ color: getSafetyColor(selectedZone.safetyScore) }}>
                                        {selectedZone.safetyScore}
                                    </span>
                                    <span className="text-zinc-500 mb-1">/100</span>
                                </div>
                                <div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-500"
                                        style={{
                                            width: `${selectedZone.safetyScore}%`,
                                            backgroundColor: getSafetyColor(selectedZone.safetyScore)
                                        }}
                                    />
                                </div>
                                <div className="mt-2 text-xs font-bold" style={{ color: getSafetyColor(selectedZone.safetyScore) }}>
                                    {getSafetyLevel(selectedZone.safetyScore)}
                                </div>
                            </div>

                            {/* Recent Incidents */}
                            <div className="p-4 bg-zinc-950 rounded-lg border border-white/10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-zinc-400">Recent Incidents (24h)</span>
                                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                                </div>
                                <div className="text-2xl font-bold text-zinc-100">
                                    {selectedZone.recentIncidents}
                                </div>
                                {selectedZone.incidentTypes.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1">
                                        {selectedZone.incidentTypes.map((type, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400"
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Active Police Units */}
                            <div className="p-4 bg-zinc-950 rounded-lg border border-white/10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-zinc-400">Active Police Units</span>
                                    <Users className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="text-2xl font-bold text-blue-400">
                                    {selectedZone.activePoliceUnits}
                                </div>
                                <div className="mt-2 text-xs text-zinc-500">
                                    Units deployed in this area
                                </div>
                            </div>

                            {/* Last Updated */}
                            <div className="text-xs text-zinc-600 text-center">
                                Last updated: {selectedZone.lastUpdated}
                            </div>
                        </div>
                    </div>
                )}

                {/* Police Unit Details Popover */}
                {selectedUnit && (
                    <div className="absolute top-4 right-4 w-80 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-blue-400" />
                                <div>
                                    <h3 className="font-bold">{selectedUnit.unitName}</h3>
                                    <p className="text-xs text-zinc-500">Police Unit</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedUnit(null)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-white/10">
                                <span className="text-sm text-zinc-400">Officers</span>
                                <span className="text-lg font-bold text-zinc-100">{selectedUnit.officers}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-white/10">
                                <span className="text-sm text-zinc-400">Status</span>
                                <span className={`text-sm font-bold uppercase px-2 py-1 rounded ${selectedUnit.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                                    selectedUnit.status === 'responding' ? 'bg-amber-500/20 text-amber-400' :
                                        'bg-zinc-700/20 text-zinc-400'
                                    }`}>
                                    {selectedUnit.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
