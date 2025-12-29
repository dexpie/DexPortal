"use client";

import Giscus from "@giscus/react";

export function Guestbook() {
    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-black/80 border border-white/10 rounded-xl backdrop-blur-sm shadow-2xl shadow-cyan-900/10">
            <Giscus
                id="comments"
                repo="dexpie/DexPortal"
                repoId="R_kgDONn3Nzw"
                category="General"
                categoryId="DIC_kwDONn3Nz84Cly2j"
                mapping="pathname"
                term="Welcome to my guestbook!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="dark_dimmed"
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
