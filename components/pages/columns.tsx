
export function Columns({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div
      className="grid gap-8 text-sm font-mono border-y border-dark/10"
      style={{ gridTemplateColumns: `repeat(${num}, 1fr)` }}
    >
      {children}
    </div>
  );
}