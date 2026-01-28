"use client";

import useSound from "use-sound";

// Short sci-fi clicks
const CLICK_SFX = "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=hud-menu-select-190697.mp3";
const HOVER_SFX = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_33fa85dfc2.mp3?filename=sci-fi-click-900.mp3";

export function useClickSound() {
    const [playClick] = useSound(CLICK_SFX, { volume: 0.5 });
    const [playHover] = useSound(HOVER_SFX, { volume: 0.1 });

    return { playClick, playHover };
}
