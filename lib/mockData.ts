// Mock camera data for the dashboard
export const mockCameras = [
    {
        id: 1,
        name: 'CAM-ALPHA-04',
        location: 'Sector 4 (Market)',
        status: 'CRITICAL' as const,
        threat: 'Machete',
        confidence: 96,
        action: 'Lunging',
        timestamp: '2026-02-10 16:03:42'
    },
    {
        id: 2,
        name: 'CAM-BRAVO-12',
        location: 'Sector 7 (Transit Hub)',
        status: 'WARNING' as const,
        threat: 'Crowd Density',
        confidence: 84,
        action: 'Gathering',
        timestamp: '2026-02-10 16:02:18'
    },
    {
        id: 3,
        name: 'CAM-CHARLIE-08',
        location: 'Sector 2 (Residential)',
        status: 'LIVE' as const,
        threat: null,
        action: null,
        timestamp: '2026-02-10 16:04:01'
    },
    {
        id: 4,
        name: 'CAM-DELTA-15',
        location: 'Sector 9 (Industrial)',
        status: 'LIVE' as const,
        threat: null,
        action: null,
        timestamp: '2026-02-10 16:03:55'
    },
    {
        id: 5,
        name: 'CAM-ECHO-03',
        location: 'Sector 1 (Downtown)',
        status: 'LIVE' as const,
        threat: null,
        action: null,
        timestamp: '2026-02-10 16:04:12'
    },
    {
        id: 6,
        name: 'CAM-FOXTROT-21',
        location: 'Sector 6 (Park)',
        status: 'LIVE' as const,
        threat: null,
        action: null,
        timestamp: '2026-02-10 16:03:28'
    }
];

// Camera positions for the map (mock coordinates for different sectors)
export const cameraPositions: Record<number, [number, number]> = {
    1: [28.6139, 77.2090], // Sector 4 (Market)
    2: [28.6289, 77.2165], // Sector 7 (Transit Hub)
    3: [28.6089, 77.2000], // Sector 2 (Residential)
    4: [28.6200, 77.2300], // Sector 9 (Industrial)
    5: [28.6100, 77.2100], // Sector 1 (Downtown)
    6: [28.6250, 77.2050], // Sector 6 (Park)
};
