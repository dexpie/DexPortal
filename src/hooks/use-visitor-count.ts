"use client";

import { useEffect, useState } from "react";

export function useVisitorCount() {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initCount() {
            // Check if we already counted this session to prevent spamming
            const visited = sessionStorage.getItem("visitor_counted");

            try {
                if (!visited) {
                    // New session visit -> Increment
                    const res = await fetch("/api/visitor-count", { method: "POST" });
                    const data = await res.json();
                    if (data.visits) {
                        setCount(data.visits);
                        sessionStorage.setItem("visitor_counted", "true");
                    }
                } else {
                    // Already visited -> Just get current
                    const res = await fetch("/api/visitor-count", { method: "GET" });
                    const data = await res.json();
                    if (data.visits) setCount(data.visits);
                }
            } catch (e) {
                console.error("Failed to fetch visitor count", e);
            } finally {
                setLoading(false);
            }
        }

        initCount();
    }, []);

    return { count, loading };
}
