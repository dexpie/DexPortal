"use client";

export function CRTOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[9998]">
            {/* Scanlines */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 0, 0, 0.3) 2px,
                        rgba(0, 0, 0, 0.3) 4px
                    )`,
                }}
            />

            {/* Subtle Flicker */}
            <div
                className="absolute inset-0 opacity-[0.02] animate-pulse"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
                }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    boxShadow: 'inset 0 0 150px rgba(0,0,0,0.7)',
                }}
            />
        </div>
    );
}
