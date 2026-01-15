"use client";

import { useEffect, useRef } from "react";

interface CommentsProps {
    repo?: string;
    repoId?: string;
    category?: string;
    categoryId?: string;
}

export function Comments({
    repo = "dexpie/dexportal",
    repoId = "",
    category = "General",
    categoryId = "",
}: CommentsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear any existing giscus
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", repo);
        script.setAttribute("data-repo-id", repoId);
        script.setAttribute("data-category", category);
        script.setAttribute("data-category-id", categoryId);
        script.setAttribute("data-mapping", "pathname");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", "dark_dimmed");
        script.setAttribute("data-lang", "en");
        script.setAttribute("data-loading", "lazy");
        script.crossOrigin = "anonymous";
        script.async = true;

        containerRef.current.appendChild(script);
    }, [repo, repoId, category, categoryId]);

    return (
        <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-cyan-400">#</span>
                Comments
            </h3>
            <div ref={containerRef} className="giscus min-h-[200px]" />
        </div>
    );
}
