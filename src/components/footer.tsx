export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-8">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-400">
                        DexPie
                    </span>
                </div>
                <p className="text-neutral-500 text-sm mb-6">
                    &copy; {new Date().getFullYear()} DexPie Portfolio. All rights reserved.
                </p>
                <div className="flex justify-center gap-6 text-neutral-400">
                    <a href="https://github.com/dexpie" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
                    <a href="https://saweria.co/dexpie" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                        <span>☕</span> Support
                    </a>
                </div>
            </div>
        </footer>
    );
}
