import Link from "next/link";
import { Home, Terminal, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                {/* Glitch Effect */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-cyan-500 to-transparent opacity-20">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AlertTriangle size={80} className="text-cyan-500 animate-pulse" />
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    <span className="text-red-500">[ERROR]</span> Page Not Found
                </h2>

                <p className="text-neutral-400 mb-8 font-mono text-sm">
                    The requested resource could not be located in the system matrix.
                    <br />
                    <span className="text-neutral-600">Error Code: NEXUS_PATH_UNDEFINED</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition-colors"
                    >
                        <Home size={18} />
                        Return to Portal
                    </Link>
                    <Link
                        href="/guestbook"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                    >
                        <Terminal size={18} />
                        Sign Guestbook
                    </Link>
                </div>

                {/* Decorative elements */}
                <div className="mt-16 text-neutral-700 font-mono text-xs">
                    <p>{">"} system.locate(requested_path)</p>
                    <p>{">"} <span className="text-red-400">null</span></p>
                    <p>{">"} <span className="text-yellow-400">redirecting...</span></p>
                </div>
            </div>
        </main>
    );
}
