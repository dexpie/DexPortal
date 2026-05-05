import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span className={cn(
      "px-3 py-1.5 text-xs font-medium rounded-full border bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-colors",
      className
    )}>
      {name}
    </span>
  );
}