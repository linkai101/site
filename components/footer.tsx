import Slider from '@/components/ui/slider';

import { cn } from '@/utils/cn';

export default function Footer({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <footer className={cn("container max-w-7xl", className)} {...rest}>
      <Slider
        direction="left"
        slides={new Array(7).fill(
          <p>You&apos;ve reached the end</p>
        )}
        className="text-light/25 text-base font-mono uppercase select-none"
      />

      <div className="p-4">
        <div className="p-4 h-80 relative flex justify-between gap-8 text-dark bg-primary rounded-xl overflow-hidden">
          <h2 className="text-8xl leading-[5.5rem] sm:text-9xl sm:leading-[6.5rem] font-heading uppercase select-none">
            Come back <span className="font-cursive lowercase">soon!</span>
          </h2>

          <div className="
            absolute top-1/2 -translate-y-1/2 right-1/2 sm:right-4 translate-x-1/2 sm:translate-x-0
            text-8xl leading-[4rem] sm:text-9xl sm:leading-[5.5rem] text-dark/10 uppercase whitespace-nowrap select-none
          ">
            <p className="font-sketchOutline">
              Thank you
            </p>
            <p className="font-sketchOutline">
              Thank you
            </p>
            <p className="font-sketchOutline">
              Thank you
            </p>
            <p className="font-sketch">
              Thank you
            </p>
            <p className="font-sketchOutline">
              Thank you
            </p>
            <p className="font-sketchOutline">
              Thank you
            </p>
            <p className="font-sketchOutline">
              Thank you
            </p>
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col items-end justify-end gap-2">
            <h3 className="text-3xl tracking-wider leading-6 text-right font-sketch font-bold normal-case">
              Have A Nice Day
            </h3>
          </div>
        </div>
      </div>

      <Slider
        direction="right"
        slides={new Array(8).fill(
          <p className="text-light/25 text-base font-mono uppercase">
            Linkai Wu &copy; {new Date().getFullYear()}
          </p>
        )}
        className="select-none"
      />
    </footer>
  );
}
