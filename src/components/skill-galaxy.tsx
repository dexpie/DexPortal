"use client";

import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Line, Sparkles, Billboard, Html } from "@react-three/drei";
import * as THREE from "three";

interface SkillNode {
    name: string;
    // Normalized 3D coordinates approx -5 to 5
    position: [number, number, number];
    importance: number; // 1 = Core, 0.5 = secondary
    color: string;
    connections: string[];
}

// A more "Natural" galaxy distribution
const skillsData: SkillNode[] = [
    // Core (The Sun)
    { name: "Gading", position: [0, 0, 0], importance: 1.5, color: "#ffffff", connections: ["React", "Node.js", "Design"] },

    // Inner Cloud (Primary)
    { name: "React", position: [2, 1, 1], importance: 1, color: "#61dafb", connections: ["Next.js", "Framer", "Gading"] },
    { name: "Next.js", position: [3, 2, 0], importance: 0.8, color: "#ffffff", connections: ["React"] },
    { name: "TypeScript", position: [-2, 1, -1], importance: 1, color: "#3178c6", connections: ["React", "Gading"] },
    { name: "Node.js", position: [-1, -2, 2], importance: 1, color: "#339933", connections: ["PostgreSQL", "Supabase", "Gading"] },

    // Outer Cloud (Ecosystem)
    { name: "Tailwind", position: [1.5, 3, -2], importance: 0.8, color: "#38bdf8", connections: ["Design", "React"] },
    { name: "Design", position: [0, 3, 0], importance: 0.8, color: "#ff0080", connections: ["Framer", "Tailwind"] },
    { name: "Framer", position: [4, 0, 2], importance: 0.7, color: "#0055ff", connections: ["React"] },
    { name: "Three.js", position: [-4, 1, -2], importance: 0.9, color: "#ffffff", connections: ["React"] },
    { name: "PostgreSQL", position: [-3, -3, 1], importance: 0.8, color: "#336791", connections: ["Node.js"] },
    { name: "Supabase", position: [-1, -4, -1], importance: 0.8, color: "#3ecf8e", connections: ["PostgreSQL"] },
    { name: "Git", position: [2, -3, -3], importance: 0.6, color: "#f05032", connections: ["TypeScript"] },
    { name: "Prisma", position: [-4, -2, 0], importance: 0.6, color: "#0c344b", connections: ["Node.js"] },
    { name: "Docker", position: [3, -2, -2], importance: 0.7, color: "#2496ed", connections: ["Node.js"] },
];

function GlowingStar({ skill, hoveredSkill, setHoveredSkill }: { skill: SkillNode, hoveredSkill: string | null, setHoveredSkill: (n: string | null) => void }) {
    const isHovered = hoveredSkill === skill.name;
    const isRelated = hoveredSkill && (skill.connections.includes(hoveredSkill) || skillsData.find(s => s.name === hoveredSkill)?.connections.includes(skill.name));

    // Dim unrelated skills when hovering
    const opacity = hoveredSkill && !isHovered && !isRelated ? 0.1 : 1;
    const scale = isHovered ? 1.5 : 1;

    return (
        <group position={skill.position}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                {/* The Star Core */}
                <mesh
                    onPointerOver={(e) => { e.stopPropagation(); setHoveredSkill(skill.name); }}
                    onPointerOut={() => setHoveredSkill(null)}
                >
                    <sphereGeometry args={[0.15 * skill.importance * scale, 32, 32]} />
                    <meshStandardMaterial
                        color={skill.color}
                        emissive={skill.color}
                        emissiveIntensity={isHovered ? 4 : 2}
                        transparent
                        opacity={opacity}
                        toneMapped={false}
                    />
                </mesh>

                {/* The Halo/Glow */}
                <mesh scale={[1.2, 1.2, 1.2]}>
                    <sphereGeometry args={[0.2 * skill.importance * scale, 32, 32]} />
                    <meshBasicMaterial
                        color={skill.color}
                        transparent
                        opacity={isHovered ? 0.4 * opacity : 0.1 * opacity}
                        side={THREE.BackSide} // Inverted sphere for glow effect
                    />
                </mesh>

                {/* Billboard Text (Always faces camera) */}
                <Billboard>
                    <Text
                        position={[0, 0.4 * skill.importance, 0]}
                        fontSize={0.25 * skill.importance}
                        color="white"
                        anchorX="center"
                        anchorY="bottom"
                        outlineWidth={0.02}
                        outlineColor="#000000"
                        fillOpacity={opacity}
                        outlineOpacity={opacity}
                    >
                        {skill.name}
                    </Text>
                </Billboard>
            </Float>
        </group>
    );
}

function ConstellationLines({ hoveredSkill }: { hoveredSkill: string | null }) {
    const lines = useMemo(() => {
        const l: any[] = [];
        skillsData.forEach(source => {
            source.connections.forEach(targetName => {
                const target = skillsData.find(s => s.name === targetName);
                if (target) {
                    l.push({ start: source.position, end: target.position, source: source.name, target: target.name });
                }
            });
        });
        return l;
    }, []);

    return (
        <group>
            {lines.map((line, i) => {
                const isActive = hoveredSkill === line.source || hoveredSkill === line.target;
                // If hovering something, hide unrelated lines. If hovering nothing, show all faint lines.
                const isVisible = hoveredSkill ? isActive : true;
                const opacity = isActive ? 0.8 : 0.05;
                const width = isActive ? 2 : 0.5;
                const color = isActive ? "#00ffff" : "#ffffff";

                return (
                    <Line
                        key={i}
                        points={[line.start, line.end]}
                        color={color}
                        transparent
                        opacity={isVisible ? opacity : 0}
                        lineWidth={width}
                    />
                );
            })}
        </group>
    );
}

function Scene() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <group rotation={[0, 0, 0]}>
            {/* Background Stars / Dust */}
            {/* Layer 1: Distant white sparkles */}
            <Sparkles count={500} scale={20} size={1} speed={0.2} opacity={0.4} color="#ffffff" />
            {/* Layer 2: Nearby drifting tech dust (Cyan/Pink) */}
            <Sparkles count={100} scale={10} size={2} speed={0.5} opacity={0.6} color="#00ffff" />

            {/* Fog for depth */}
            <fog attach="fog" args={['#000000', 5, 25]} />

            {/* Skills */}
            {skillsData.map(skill => (
                <GlowingStar
                    key={skill.name}
                    skill={skill}
                    hoveredSkill={hoveredSkill}
                    setHoveredSkill={setHoveredSkill}
                />
            ))}

            {/* Lines */}
            <ConstellationLines hoveredSkill={hoveredSkill} />
        </group>
    );
}

export function SkillGalaxy() {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className="h-[600px] w-full bg-black flex items-center justify-center text-white font-mono border border-red-900/50">
                [SYSTEM_FAILURE] 3D_RENDER_CRASH. LOGS_UPLOADED.
            </div>
        );
    }

    return (
        <div className="h-[600px] w-full relative bg-black">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                style={{ background: '#000000' }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color('#000000'));
                }}
                onError={() => setError(true)}
            >
                <color attach="background" args={["#000000"]} />

                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />

                    <Scene />
                </Suspense>

                {/* Slow auto-rotation for the cinematic feel */}
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Canvas>

            <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground pointer-events-none">
                [INTERACTIVE_STARMAP] [HOVER_FOR_INTEL]
            </div>
        </div>
    );
}
