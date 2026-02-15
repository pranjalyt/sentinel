'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Eye, Brain, Radio, Lock, Users, TrendingUp, ChevronRight, Activity, Cpu, Database, Video } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <div ref={containerRef} className="bg-zinc-950 text-zinc-100 overflow-x-hidden">
            {/* Animated Background Grid */}
            <div className="fixed inset-0 z-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }} />
            </div>

            <style jsx global>{`
                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
                }
                @keyframes radar-scan {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .shimmer-button {
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(6, 182, 212, 0.3),
                        transparent
                    );
                    background-size: 200% 100%;
                    animation: shimmer 3s infinite;
                }
            `}</style>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-cyan-500" />
                        <h1 className="text-xl font-bold tracking-widest">
                            {'VDMA '}<span className="text-zinc-500">{'//'}</span>{' AI'}
                        </h1>
                    </Link>


                    <div className="flex items-center gap-8">
                        <a href="#mission" className="text-sm text-zinc-400 hover:text-cyan-500 transition-colors">Mission</a>
                        <a href="#technology" className="text-sm text-zinc-400 hover:text-cyan-500 transition-colors">Technology</a>
                        <a href="#features" className="text-sm text-zinc-400 hover:text-cyan-500 transition-colors">Features</a>
                        <Link href="/heatmap" className="text-sm text-zinc-400 hover:text-cyan-500 transition-colors">
                            Safety Map
                        </Link>

                        <Link href="/dashboard">
                            <button className="relative px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-lg font-bold text-sm overflow-hidden group">
                                <span className="relative z-10 flex items-center gap-2">
                                    LAUNCH DASHBOARD
                                    <ChevronRight className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 shimmer-button opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-6xl mx-auto px-6 text-center z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-mono mb-6">
                            OMNISCIENCE AS A SERVICE
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-7xl font-black tracking-tighter mb-6 leading-tight"
                    >
                        Transforming Urban Surveillance<br />
                        into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Actionable Intelligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        From passive recording to active prevention. VDMA AI processes thousands of feeds in real-time to detect threats before they escalate.
                    </motion.p>

                    {/* Radar Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="relative w-64 h-64 mx-auto mb-16"
                    >
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
                        <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
                        <div className="absolute inset-8 rounded-full border border-cyan-500/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Shield className="w-16 h-16 text-cyan-500" />
                        </div>
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.3) 10%, transparent 20%)',
                                animation: 'radar-scan 4s linear infinite'
                            }}
                        />
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
                    >
                        {[
                            { value: '12ms', label: 'Latency' },
                            { value: '99.8%', label: 'Accuracy' },
                            { value: 'Zero', label: 'False Positives' }
                        ].map((stat, i) => (
                            <div key={i} className="p-6 bg-zinc-900/50 border border-white/10 rounded-lg backdrop-blur-sm">
                                <div className="text-3xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2 text-zinc-600">
                        <span className="text-xs font-mono">SCROLL TO EXPLORE</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ChevronRight className="w-4 h-4 rotate-90" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* How It Works - VDMA Engine Architecture */}
            <section id="mission" className="relative py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl font-black tracking-tighter mb-4">
                            THE <span className="text-cyan-400">VDMA ENGINE</span>
                        </h2>
                        <p className="text-zinc-500 text-lg">Multi-modal behavior analysis with instant cloud alerting</p>
                    </motion.div>

                    {/* Data Ingestion */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Data Ingestion</h3>
                            <p className="text-zinc-400 text-sm">Multi-source input streams</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-lg">
                                <Video className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="font-bold mb-2">Video Stream</h4>
                                <p className="text-sm text-zinc-400">Live CCTV feeds from cameras</p>
                            </div>
                            <div className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-lg">
                                <Radio className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="font-bold mb-2">Webhook</h4>
                                <p className="text-sm text-zinc-400">Real-time event triggers</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Parallel Processing Paths */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Parallel Processing Paths</h3>
                            <p className="text-zinc-400 text-sm">Simultaneous multi-modal analysis</p>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-all">
                                <Eye className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="font-bold mb-2 text-cyan-400">Vision Path</h4>
                                <div className="space-y-2 text-sm text-zinc-400">
                                    <p>• Video Frames</p>
                                    <p>• Skeleton/Pose Estimation</p>
                                    <p>• Object Detection</p>
                                </div>
                            </div>
                            <div className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-all">
                                <Database className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="font-bold mb-2 text-cyan-400">Depth Path</h4>
                                <div className="space-y-2 text-sm text-zinc-400">
                                    <p>• Depth Sensors</p>
                                    <p>• LiDAR Data</p>
                                    <p>• 3D Spatial Analysis</p>
                                </div>
                            </div>
                            <div className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-all">
                                <Activity className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="font-bold mb-2 text-cyan-400">Motion Path</h4>
                                <div className="space-y-2 text-sm text-zinc-400">
                                    <p>• Kinetic Motion</p>
                                    <p>• Speed Analysis</p>
                                    <p>• Movement Patterns</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* VDMA Engine */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-2 border-cyan-500/50 rounded-lg">
                            <Brain className="w-12 h-12 text-cyan-400 mb-4 mx-auto" />
                            <h3 className="text-3xl font-black text-center mb-3">VDMA ENGINE</h3>
                            <p className="text-center text-cyan-400 font-mono mb-4">Behavior AI</p>
                            <p className="text-center text-zinc-400">Fuses data from all processing paths to determine behavioral patterns and detect anomalies in real-time</p>
                        </div>
                    </motion.div>

                    {/* Decision & Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Decision & Action</h3>
                            <p className="text-zinc-400 text-sm">Intelligent response system</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
                            <div className="p-6 bg-zinc-900 border border-emerald-500/20 rounded-lg">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h4 className="font-bold mb-2 text-emerald-400">Normal Behavior</h4>
                                <p className="text-sm text-zinc-400 mb-3">No threats detected</p>
                                <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-sm font-mono text-emerald-400">
                                    → All Clear / Leave
                                </div>
                            </div>
                            <div className="p-6 bg-zinc-900 border border-red-500/20 rounded-lg">
                                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-red-400" />
                                </div>
                                <h4 className="font-bold mb-2 text-red-400">Problem Detected</h4>
                                <p className="text-sm text-zinc-400 mb-3">Anomaly identified</p>
                                <div className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-sm font-mono text-red-400">
                                    → Record 10s Video File
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Storage & Alerting */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Storage & Instant Alerts</h3>
                            <p className="text-zinc-400 text-sm">Secure cloud storage with real-time notifications</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-lg">
                                    <Database className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h4 className="font-bold mb-2">AWS S3 Storage</h4>
                                    <p className="text-sm text-zinc-400">10s video clips stored securely in the cloud</p>
                                </div>
                                <div className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-lg">
                                    <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h4 className="font-bold mb-2">Data Block</h4>
                                    <p className="text-sm text-zinc-400">Video link + location metadata generated</p>
                                </div>
                                <div className="p-6 bg-zinc-900 border border-red-500/20 rounded-lg">
                                    <Radio className="w-8 h-8 text-red-400 mb-3" />
                                    <h4 className="font-bold mb-2">Instant Dispatch</h4>
                                    <p className="text-sm text-zinc-400">WhatsApp & Telegram bots send alerts immediately</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tech Stack */}
            <section id="technology" className="relative py-32 px-6 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl font-black tracking-tighter mb-4">
                            POWERED BY <span className="text-cyan-400">CUTTING-EDGE</span> TECH
                        </h2>
                        <p className="text-zinc-500 text-lg">Enterprise-grade stack, edge-compatible deployment</p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { category: 'Vision', items: ['Ultralytics YOLOv8', 'MediaPipe Pose'], icon: Eye },
                            { category: 'Intelligence', items: ['Vector Heuristics', 'Behavior Analysis'], icon: Brain },
                            { category: 'Core', items: ['Next.js 14', 'Python + OpenCV'], icon: Cpu },
                            { category: 'Hardware', items: ['Edge GPU Compatible', 'CUDA Optimized'], icon: Database }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="p-6 bg-zinc-900 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
                            >
                                <tech.icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold mb-3 text-cyan-400">{tech.category}</h3>
                                {tech.items.map((item, j) => (
                                    <p key={j} className="text-sm text-zinc-400 mb-1 font-mono">{item}</p>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="relative py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl font-black tracking-tighter mb-4">
                            WHY <span className="text-cyan-400">VDMA</span>
                        </h2>
                        <p className="text-zinc-500 text-lg">Built for the real world, not the lab</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Privacy First',
                                description: 'Dynamic face blurring that only unmasks confirmed threats.',
                                icon: Lock,
                                color: 'cyan'
                            },
                            {
                                title: 'Crowd Physics',
                                description: 'Real-time stampede prediction using flow entropy.',
                                icon: Users,
                                color: 'cyan'
                            },
                            {
                                title: 'Weapon Recognition',
                                description: 'Instant detection of knives and firearms in low light.',
                                icon: Activity,
                                color: 'red'
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden"
                            >
                                <div className="p-8 bg-zinc-900 border border-white/10 rounded-lg h-full hover:border-cyan-500/50 transition-all duration-300">
                                    <div className={`w-16 h-16 bg-${feature.color}-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${feature.color}-500/20 transition-colors`}>
                                        <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl font-black tracking-tighter mb-6">
                            Ready to See It <span className="text-cyan-400">Live?</span>
                        </h2>
                        <p className="text-xl text-zinc-400 mb-12">
                            Experience real-time threat detection in action
                        </p>
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-12 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-lg font-bold text-lg overflow-hidden group"
                                style={{ animation: 'pulse-glow 2s infinite' }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Shield className="w-5 h-5" />
                                    LAUNCH DASHBOARD
                                    <ChevronRight className="w-5 h-5" />
                                </span>
                                <div className="absolute inset-0 shimmer-button opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative border-t border-white/10 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-cyan-500" />
                            <span className="font-bold tracking-wider">{'VDMA // AI'}</span>
                        </div>
                        <div className="text-sm text-zinc-600">
                            © 2026 VDMA AI. Built for urban safety.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
