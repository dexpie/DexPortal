"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, LayoutTemplate, FileText, LogOut, ArrowLeft, MessageSquare, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"projects" | "blog" | "guestbook" | "overview">("overview");
    const [projects, setProjects] = useState<any[]>([]);
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [guestbookEntries, setGuestbookEntries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    }

    async function fetchData() {
        setIsLoading(true);
        try {
            const [projectsRes, blogRes, guestbookRes] = await Promise.all([
                fetch("/api/projects"),
                fetch("/api/blog"),
                fetch("/api/guestbook")
            ]);
            setProjects(await projectsRes.json());
            setBlogPosts(await blogRes.json());
            setGuestbookEntries(await guestbookRes.json());
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string, type: "projects" | "blog" | "guestbook") {
        if (!confirm("Are you sure?")) return;
        await fetch(`/api/${type}/${id}`, { method: "DELETE" });
        fetchData();
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        const type = activeTab;
        if (type === "guestbook") return; // Guestbook is delete-only for now

        const method = isAdding ? "POST" : "PUT";
        const url = isAdding ? `/api/${type}` : `/api/${type}/${editForm.id}`;

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm),
        });

        setIsEditing(null);
        setIsAdding(false);
        setEditForm({});
        fetchData();
    }

    const openEdit = (item: any) => {
        if (activeTab === "guestbook") return;
        setEditForm(item);
        setIsEditing(item.id);
        setIsAdding(false);
    };

    const openAdd = () => {
        if (activeTab === "guestbook") return;
        setEditForm(activeTab === "projects" ? {
            title: "", description: "", href: "", category: "Web App", status: "Development"
        } : {
            title: "", excerpt: "", slug: "", date: new Date().toLocaleDateString(), author: "Dexpie", category: "Changelog", readTime: "1 min read"
        });
        setIsAdding(true);
        setIsEditing(null);
    };

    const renderList = () => {
        let items = [];
        if (activeTab === "projects") items = projects;
        else if (activeTab === "blog") items = blogPosts;
        else items = guestbookEntries;

        return items.map((item) => (
            <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg hover:border-white/10 transition-colors"
            >
                <div>
                    <h3 className="font-bold text-lg">{item.title || item.name}</h3>
                    <p className="text-sm text-neutral-500">{item.description || item.excerpt || item.message}</p>
                    {activeTab === "guestbook" && <p className="text-xs text-neutral-600 mt-1">{new Date(item.date).toLocaleString()}</p>}
                </div>
                <div className="flex gap-2">
                    {activeTab !== "guestbook" && activeTab !== "overview" && <button onClick={() => openEdit(item)} className="p-2 hover:text-cyan-400 transition-colors"><Edit2 size={18} /></button>}
                    {activeTab !== "overview" && <button onClick={() => handleDelete(item.id, activeTab as "projects" | "blog" | "guestbook")} className="p-2 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>}
                </div>
            </motion.div>
        ));
    };

    return (
        <main className="min-h-screen bg-background container mx-auto px-6 py-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-cyan-400 mb-2 transition-colors">
                        <ArrowLeft size={16} /> Back to Portal
                    </Link>
                    <h1 className="text-4xl font-bold text-cyan-400">Command Center</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-mono text-sm"
                >
                    <LogOut size={16} /> DISCONNECT
                </button>
            </div>

            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${activeTab === "overview" ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "border-white/10 text-neutral-400 hover:bg-white/5"}`}
                >
                    <Activity size={18} /> Overview
                </button>
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${activeTab === "projects" ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "border-white/10 text-neutral-400 hover:bg-white/5"}`}
                >
                    <LayoutTemplate size={18} /> Projects
                </button>
                <button
                    onClick={() => setActiveTab("blog")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${activeTab === "blog" ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "border-white/10 text-neutral-400 hover:bg-white/5"}`}
                >
                    <FileText size={18} /> Blog Posts
                </button>
                <button
                    onClick={() => setActiveTab("guestbook")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${activeTab === "guestbook" ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "border-white/10 text-neutral-400 hover:bg-white/5"}`}
                >
                    <MessageSquare size={18} /> Guestbook
                </button>
            </div>

            <div className="flex justify-end mb-6">
                {activeTab !== "guestbook" && activeTab !== "overview" && (
                    <button onClick={openAdd} className="bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-500 transition-colors">
                        <Plus size={18} /> Add New
                    </button>
                )}
            </div>

            {(isEditing || isAdding) && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-xl font-bold">{isAdding ? "Create New" : "Edit Item"}</h3>
                        <button onClick={() => { setIsEditing(null); setIsAdding(false); }}><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(editForm).map((key) => {
                            if (key === 'id') return null;
                            if (key === 'content') {
                                return (
                                    <div key={key} className="col-span-full flex flex-col gap-2">
                                        <label className="capitalize text-sm text-neutral-400">{key} (Markdown)</label>
                                        <textarea
                                            className="bg-black/40 border border-white/10 rounded p-2 focus:border-cyan-500 outline-none font-mono text-sm h-64 resize-y"
                                            value={editForm[key] || ""}
                                            onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                                        />
                                    </div>
                                );
                            }
                            return (
                                <div key={key} className="flex flex-col gap-2">
                                    <label className="capitalize text-sm text-neutral-400">{key}</label>
                                    <input
                                        className="bg-black/40 border border-white/10 rounded p-2 focus:border-cyan-500 outline-none"
                                        value={editForm[key] || ""}
                                        onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                                    />
                                </div>
                            );
                        })}
                        <div className="col-span-full pt-4">
                            <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 w-full justify-center">
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid gap-4">
                {isLoading ? (
                    <div className="text-center py-20 text-neutral-500">Loading data matrix...</div>
                ) : activeTab === "overview" ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Mock Stats */}
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-sm text-neutral-400 mb-2">Total Visits</h3>
                            <div className="text-3xl font-bold text-white">12,453</div>
                            <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                <Activity size={12} /> +12% this week
                            </div>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-sm text-neutral-400 mb-2">Real-time Users</h3>
                            <div className="text-3xl font-bold text-cyan-400 animate-pulse">4</div>
                            <div className="text-xs text-neutral-500 mt-1">Active now</div>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-sm text-neutral-400 mb-2">System Status</h3>
                            <div className="text-3xl font-bold text-green-400">ONLINE</div>
                            <div className="text-xs text-neutral-500 mt-1">All systems nominal</div>
                        </div>

                        {/* Recent Activity Log */}
                        <div className="col-span-full mt-4 p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-lg font-bold mb-4">Recent System Activity</h3>
                            <div className="space-y-4">
                                {[
                                    { msg: "User login detected (Admin)", time: "2 mins ago" },
                                    { msg: "New guestbook entry received", time: "1 hour ago" },
                                    { msg: "Project 'DexPortal' updated", time: "3 hours ago" },
                                    { msg: "Database backup completed", time: "5 hours ago" },
                                    { msg: "System reboot initiated", time: "1 day ago" },
                                ].map((log, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-sm text-neutral-300">{log.msg}</span>
                                        <span className="text-xs text-neutral-500 font-mono">{log.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    renderList()
                )}
            </div>
        </main>
    );
}
