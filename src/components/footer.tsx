export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-8">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
                        DexPortal
                    </span>
                </div>
                <p className="text-neutral-500 text-sm mb-8">
                    &copy; {new Date().getFullYear()} Dex Ecosystem. All rights reserved.
                </p>
                <div className="flex justify-center gap-6 text-neutral-400">
                    {/* Social links or other links could go here */}
                    <a href="#" className="hover:text-red-500 transition-colors">GitHub</a>
                    <a href="#" className="hover:text-red-500 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-red-500 transition-colors">Discord</a>
                </div>
            </div>
        </footer>
    );
}
