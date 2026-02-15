'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { CheckCircle2, XCircle, Clock, Activity } from 'lucide-react';

interface SystemComponent {
    name: string;
    status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
    latency: string;
    uptime: string;
    lastCheck: string;
}

const systemComponents: SystemComponent[] = [
    {
        name: 'AI Inference Engine',
        status: 'ONLINE',
        latency: '12ms',
        uptime: '99.98%',
        lastCheck: '2026-02-10 16:17:15',
    },
    {
        name: 'Database Cluster',
        status: 'ONLINE',
        latency: '8ms',
        uptime: '99.99%',
        lastCheck: '2026-02-10 16:17:18',
    },
    {
        name: 'Camera Feed Gateway',
        status: 'ONLINE',
        latency: '24ms',
        uptime: '99.95%',
        lastCheck: '2026-02-10 16:17:20',
    },
    {
        name: 'Object Detection Service',
        status: 'ONLINE',
        latency: '45ms',
        uptime: '99.92%',
        lastCheck: '2026-02-10 16:17:12',
    },
    {
        name: 'Alert Notification System',
        status: 'ONLINE',
        latency: '6ms',
        uptime: '100.00%',
        lastCheck: '2026-02-10 16:17:22',
    },
    {
        name: 'Video Stream Processor',
        status: 'ONLINE',
        latency: '18ms',
        uptime: '99.96%',
        lastCheck: '2026-02-10 16:17:14',
    },
    {
        name: 'Authentication Service',
        status: 'ONLINE',
        latency: '5ms',
        uptime: '99.99%',
        lastCheck: '2026-02-10 16:17:19',
    },
    {
        name: 'Load Balancer',
        status: 'ONLINE',
        latency: '3ms',
        uptime: '100.00%',
        lastCheck: '2026-02-10 16:17:21',
    },
    {
        name: 'Cache Layer (Redis)',
        status: 'ONLINE',
        latency: '2ms',
        uptime: '99.97%',
        lastCheck: '2026-02-10 16:17:16',
    },
    {
        name: 'Message Queue',
        status: 'ONLINE',
        latency: '7ms',
        uptime: '99.94%',
        lastCheck: '2026-02-10 16:17:17',
    },
    {
        name: 'Backup System',
        status: 'ONLINE',
        latency: '15ms',
        uptime: '99.89%',
        lastCheck: '2026-02-10 16:17:13',
    },
    {
        name: 'Logging Service',
        status: 'ONLINE',
        latency: '4ms',
        uptime: '99.98%',
        lastCheck: '2026-02-10 16:17:11',
    },
];

function StatusBadge({ status }: { status: SystemComponent['status'] }) {
    const config = {
        ONLINE: {
            icon: <CheckCircle2 className="w-3 h-3" />,
            className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        },
        OFFLINE: {
            icon: <XCircle className="w-3 h-3" />,
            className: 'bg-red-500/20 text-red-400 border-red-500/40',
        },
        DEGRADED: {
            icon: <Activity className="w-3 h-3" />,
            className: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        },
    };

    const { icon, className } = config[status];

    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-bold ${className}`}>
            {icon}
            <span>{status}</span>
        </div>
    );
}

export default function SystemHealthPage() {
    const onlineCount = systemComponents.filter(c => c.status === 'ONLINE').length;
    const totalCount = systemComponents.length;
    const healthPercentage = ((onlineCount / totalCount) * 100).toFixed(1);

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full overflow-auto">
                {/* Header */}
                <header className="border-b border-white/10 p-6 bg-zinc-950 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">System Health</h2>
                            <p className="text-sm text-zinc-500 mt-1">
                                Real-time monitoring of all system components
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-emerald-400">{healthPercentage}%</div>
                            <div className="text-xs text-zinc-500">System Health</div>
                        </div>
                    </div>
                </header>

                {/* Summary Cards */}
                <div className="p-6 border-b border-white/10 bg-zinc-950">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/20 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{onlineCount}</div>
                                    <div className="text-xs text-zinc-500">Online</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <XCircle className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-xs text-zinc-500">Offline</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/20 rounded-lg">
                                    <Activity className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-xs text-zinc-500">Degraded</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">14ms</div>
                                    <div className="text-xs text-zinc-500">Avg Latency</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-zinc-900 border-b border-white/10">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Component Name
                                </th>
                                <th className="text-left p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-left p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Latency
                                </th>
                                <th className="text-left p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Uptime
                                </th>
                                <th className="text-left p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Last Check
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {systemComponents.map((component, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="font-medium">{component.name}</div>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={component.status} />
                                    </td>
                                    <td className="p-4">
                                        <span className="font-mono text-sm text-zinc-300">
                                            {component.latency}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500"
                                                    style={{ width: component.uptime }}
                                                />
                                            </div>
                                            <span className="text-sm font-mono text-zinc-300 min-w-[60px]">
                                                {component.uptime}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm font-mono text-zinc-400">
                                            {component.lastCheck}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
