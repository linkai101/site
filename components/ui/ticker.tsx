import { cn } from '@/lib/utils';

export default function Ticker({ slides, direction="left", className, ...rest }: {
  slides: React.ReactNode[],
  direction?: "left"|"right",
  className?: string,
  [key: string]: any
}) {
  return (
    <div className={cn("relative w-full overflow-hidden ticker", className)} {...rest}>
      <div
        className={`${direction==='left' ? "slide-track-10" : "-slide-track-10"} hover:pause flex justify-around items-center`}
      >
        {[...slides, ...slides].map((slide,i) => (
          <div key={i} className="whitespace-nowrap">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
