// Mock data for safety heatmap zones
export interface HeatmapZone {
    id: number;
    center: [number, number];
    radius: number;
    safetyScore: number; // 0-100, higher is safer
    recentIncidents: number;
    activePoliceUnits: number;
    incidentTypes: string[];
    lastUpdated: string;
}

export interface PoliceUnit {
    id: number;
    position: [number, number];
    unitName: string;
    officers: number;
    status: 'active' | 'responding' | 'standby';
}

// Delhi area coordinates (around Connaught Place)
export const heatmapZones: HeatmapZone[] = [
    {
        id: 1,
        center: [28.6139, 77.2090], // Connaught Place
        radius: 800,
        safetyScore: 45,
        recentIncidents: 12,
        activePoliceUnits: 3,
        incidentTypes: ['Theft', 'Pickpocketing', 'Vandalism'],
        lastUpdated: '2026-02-15 10:30:00'
    },
    {
        id: 2,
        center: [28.6289, 77.2065], // Karol Bagh
        radius: 600,
        safetyScore: 72,
        recentIncidents: 4,
        activePoliceUnits: 2,
        incidentTypes: ['Traffic Violation'],
        lastUpdated: '2026-02-15 10:25:00'
    },
    {
        id: 3,
        center: [28.6012, 77.2066], // India Gate
        radius: 700,
        safetyScore: 88,
        recentIncidents: 1,
        activePoliceUnits: 4,
        incidentTypes: ['Minor Disturbance'],
        lastUpdated: '2026-02-15 10:20:00'
    },
    {
        id: 4,
        center: [28.6328, 77.2197], // Chandni Chowk
        radius: 900,
        safetyScore: 38,
        recentIncidents: 18,
        activePoliceUnits: 2,
        incidentTypes: ['Theft', 'Assault', 'Crowd Issues', 'Pickpocketing'],
        lastUpdated: '2026-02-15 10:35:00'
    },
    {
        id: 5,
        center: [28.5989, 77.1910], // Rajpath
        radius: 500,
        safetyScore: 92,
        recentIncidents: 0,
        activePoliceUnits: 5,
        incidentTypes: [],
        lastUpdated: '2026-02-15 10:15:00'
    },
    {
        id: 6,
        center: [28.6219, 77.2273], // Kashmere Gate
        radius: 650,
        safetyScore: 58,
        recentIncidents: 7,
        activePoliceUnits: 2,
        incidentTypes: ['Theft', 'Traffic Violation'],
        lastUpdated: '2026-02-15 10:28:00'
    },
    {
        id: 7,
        center: [28.6050, 77.2295], // Pragati Maidan
        radius: 550,
        safetyScore: 76,
        recentIncidents: 3,
        activePoliceUnits: 3,
        incidentTypes: ['Minor Disturbance'],
        lastUpdated: '2026-02-15 10:22:00'
    },
    {
        id: 8,
        center: [28.6280, 77.1885], // Paharganj
        radius: 750,
        safetyScore: 42,
        recentIncidents: 15,
        activePoliceUnits: 2,
        incidentTypes: ['Theft', 'Drug Activity', 'Assault'],
        lastUpdated: '2026-02-15 10:32:00'
    }
];

export const policeUnits: PoliceUnit[] = [
    {
        id: 1,
        position: [28.6139, 77.2090],
        unitName: 'CP-Alpha',
        officers: 4,
        status: 'active'
    },
    {
        id: 2,
        position: [28.6289, 77.2065],
        unitName: 'KB-Bravo',
        officers: 3,
        status: 'standby'
    },
    {
        id: 3,
        position: [28.6012, 77.2066],
        unitName: 'IG-Charlie',
        officers: 5,
        status: 'active'
    },
    {
        id: 4,
        position: [28.6328, 77.2197],
        unitName: 'CC-Delta',
        officers: 3,
        status: 'responding'
    },
    {
        id: 5,
        position: [28.5989, 77.1910],
        unitName: 'RP-Echo',
        officers: 6,
        status: 'active'
    },
    {
        id: 6,
        position: [28.6219, 77.2273],
        unitName: 'KG-Foxtrot',
        officers: 3,
        status: 'standby'
    },
    {
        id: 7,
        position: [28.6050, 77.2295],
        unitName: 'PM-Golf',
        officers: 4,
        status: 'active'
    },
    {
        id: 8,
        position: [28.6280, 77.1885],
        unitName: 'PH-Hotel',
        officers: 3,
        status: 'responding'
    }
];

// Helper function to get color based on safety score
export const getSafetyColor = (score: number): string => {
    if (score >= 80) return '#10b981'; // Green - Safe
    if (score >= 60) return '#fbbf24'; // Yellow - Moderate
    if (score >= 40) return '#fb923c'; // Orange - Caution
    return '#ef4444'; // Red - High Risk
};

// Helper function to get safety level text
export const getSafetyLevel = (score: number): string => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Moderate';
    if (score >= 40) return 'Caution';
    return 'High Risk';
};
