import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SysConfigState {
    zenMode: boolean;
    lowMotion: boolean;
    toggleZenMode: () => void;
    toggleLowMotion: () => void;
}

export const useSysConfig = create<SysConfigState>()(
    persist(
        (set) => ({
            zenMode: false,
            lowMotion: false,
            toggleZenMode: () => set((state) => ({ zenMode: !state.zenMode })),
            toggleLowMotion: () => set((state) => ({ lowMotion: !state.lowMotion })),
        }),
        {
            name: 'sys-config-storage',
        }
    )
);
