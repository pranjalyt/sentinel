'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { TrendingUp, AlertTriangle, Clock, Target } from 'lucide-react';

// Mock data for charts
const incidentTrends = [
    { day: 'Mon', incidents: 12 },
    { day: 'Tue', incidents: 19 },
    { day: 'Wed', incidents: 8 },
    { day: 'Thu', incidents: 15 },
    { day: 'Fri', incidents: 22 },
    { day: 'Sat', incidents: 14 },
    { day: 'Sun', incidents: 10 },
];

const incidentTypes = [
    { name: 'Weapon Detection', value: 8, color: '#ef4444' },
    { name: 'Crowd Density', value: 15, color: '#f59e0b' },
    { name: 'Suspicious Activity', value: 12, color: '#eab308' },
    { name: 'False Alarms', value: 5, color: '#6b7280' },
];

const incidentsBySector = [
    { sector: 'Sector 1', count: 8 },
    { sector: 'Sector 2', count: 5 },
    { sector: 'Sector 4', count: 18 },
    { sector: 'Sector 6', count: 7 },
    { sector: 'Sector 7', count: 12 },
    { sector: 'Sector 9', count: 10 },
];

interface MetricCardProps {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
}

function MetricCard({ title, value, subtitle, icon, trend, trendUp }: MetricCardProps) {
    return (
        <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{title}</p>
                    <p className="text-3xl font-bold mb-1">{value}</p>
                    <p className="text-xs text-zinc-400">{subtitle}</p>
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-xs ${trendUp ? 'text-red-400' : 'text-emerald-400'}`}>
                            <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
                            <span>{trend}</span>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col h-full overflow-auto">
                {/* Header */}
                <header className="border-b border-white/10 p-6 bg-zinc-950 sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold">Analytics</h2>
                        <p className="text-sm text-zinc-500 mt-1">
                            Performance metrics and incident trends
                        </p>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Top Row - Metric Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <MetricCard
                            title="Total Incidents Today"
                            value="14"
                            subtitle="Last 24 hours"
                            icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
                            trend="+12% from yesterday"
                            trendUp={true}
                        />
                        <MetricCard
                            title="Avg. Response Time"
                            value="2m 34s"
                            subtitle="Critical incidents"
                            icon={<Clock className="w-6 h-6 text-amber-400" />}
                            trend="-8% improvement"
                            trendUp={false}
                        />
                        <MetricCard
                            title="Weapon Detections"
                            value="3"
                            subtitle="This week"
                            icon={<Target className="w-6 h-6 text-red-500" />}
                            trend="+1 from last week"
                            trendUp={true}
                        />
                    </div>

                    {/* Middle Row - Line Chart */}
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Incident Trends (Last 7 Days)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={incidentTrends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                <XAxis
                                    dataKey="day"
                                    stroke="#71717a"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#71717a"
                                    style={{ fontSize: '12px' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fafafa'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="incidents"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ fill: '#ef4444', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bottom Row - Pie and Bar Charts */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Pie Chart */}
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Incident Types</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={incidentTypes}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }: { name?: string | number; percent?: number }) => `${name || ''} ${(percent ? (percent * 100).toFixed(0) : '0')}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {incidentTypes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#18181b',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            color: '#fafafa'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Incidents by Sector</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={incidentsBySector}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                    <XAxis
                                        dataKey="sector"
                                        stroke="#71717a"
                                        style={{ fontSize: '11px' }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis
                                        stroke="#71717a"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#18181b',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            color: '#fafafa'
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
