import { cn } from "@/lib/utils";

interface TechBadgeProps {
    name: string;
    className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
    return (
        <span className={cn(
            "px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded border bg-neutral-900",
            name === "Next.js" ? "border-white/20 text-white" :
                name === "TypeScript" ? "border-blue-500/20 text-blue-400" :
                    name === "Python" ? "border-yellow-500/20 text-yellow-400" :
                        name === "Tailwind" ? "border-cyan-500/20 text-cyan-400" :
                            "border-neutral-700 text-neutral-400",
            className
        )}>
            {name}
        </span>
    );
}
