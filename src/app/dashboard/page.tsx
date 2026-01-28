"use client";

import { motion } from "framer-motion";
import { Activity, Code, Cpu, Database, GitBranch, Globe, Server, User, Wifi } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const stats = [
    { label: "System Status", value: "ONLINE", icon: Activity, color: "text-green-500" },
    { label: "Total Visitors", value: "8,242", icon: User, color: "text-blue-500" },
    { label: "Deployment", value: "VERCEL", icon: Server, color: "text-white" },
    { label: "Region", value: "SIN1", icon: Globe, color: "text-yellow-500" },
];

const modules = [
    { name: "Neural Interface", status: "Active", load: "12%" },
    { name: "Project Database", status: "Mounted", load: "45%" },
    { name: "Guestbook API", status: "Standby", load: "0%" },
    { name: "Visual Core", status: "Optimal", load: "88%" },
];

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-mono">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end"
                >
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
                            CYBERDECK DASHBOARD
                        </h1>
                        <p className="text-neutral-400">System Metrics & Analytics</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-neutral-500">SESSION ID</div>
                        <div className="font-mono text-cyan-500">UNK-882-X1</div>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <Icon className={stat.color} />
                                    <Wifi size={14} className="text-neutral-600 animate-pulse" />
                                </div>
                                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                <div className="text-xs text-neutral-400 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Complex Data Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Module Status */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 p-8 rounded-xl bg-black border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-cyan-500/5" />
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                            <Cpu size={20} className="text-cyan-400" />
                            MODULE STATUS
                        </h3>
                        <div className="space-y-4 relative z-10">
                            {modules.map((mod, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                                        <span className="font-medium">{mod.name}</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-neutral-400">
                                        <span>{mod.status}</span>
                                        <span className="font-mono text-cyan-500 w-12 text-right">{mod.load}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Repository Access */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-8 rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-white/10"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <GitBranch size={20} className="text-purple-400" />
                            REPO ACCESS
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Commits</span>
                                <span className="font-mono">824</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Branches</span>
                                <span className="font-mono">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Contributors</span>
                                <span className="font-mono">1</span>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <div className="text-xs text-neutral-500 mb-2">LATEST COMMIT</div>
                                <div className="font-mono text-sm text-cyan-400 truncate">
                                    feat: implement cyberdeck dashboard
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
