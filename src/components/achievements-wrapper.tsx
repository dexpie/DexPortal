"use client";

import { useState, useEffect } from "react";
import { AchievementsModal } from "@/components/achievements-modal";

export function AchievementsWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("toggle-achievements", handleOpen);
        return () => window.removeEventListener("toggle-achievements", handleOpen);
    }, []);

    return <AchievementsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
