import { cn } from "@/lib/utils";

export function Columns({ num, borderVisible = false, children }: { num: number; borderVisible?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn("grid gap-x-8 gap-y-4 text-sm font-mono", borderVisible && "border-y border-dark/10")}
      style={{ gridTemplateColumns: `repeat(${num}, 1fr)` }}
    >
      {children}
    </div>
  );
}