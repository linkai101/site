"use client";
import { cn } from '@/lib/utils';
import Ticker from '@/components/ui/ticker';

export default function Footer({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <footer className={cn("container max-w-7xl", className)} {...rest}>
      <Ticker
        direction="left"
        slides={[
          <p key="1">You&apos;ve reached the end</p>,
          <p key="2">ʕ•̫͡•ʕ*̫͡*ʕ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ-̫͡-ʔ </p>,
          <p key="3">You&apos;ve reached the end</p>,
          <p key="4">óÔÔò ʕ·͡ᴥ·ʔ óÔÔò</p>,
          <p key="5">You&apos;ve reached the end</p>,
          <p key="6">(╯°□°）╯︵ ┻━┻</p>,
          <p key="7">You&apos;ve reached the end</p>,
          <p key="8">¯\_(ツ)_/¯ </p>,
        ]}
        className="text-dark/25 dark:text-light/25 text-base font-mono tracking-tight uppercase select-none"
      />

      <div className="px-4 py-3">
        <div className="p-4 h-80 relative flex justify-between gap-8 text-light dark:text-dark bg-primary rounded-xl overflow-hidden">
          <h2 className="text-8xl leading-[5.5rem] sm:text-9xl sm:leading-[6.5rem] font-heading select-none">
            Come back <span className="font-cursive">soon!</span>
          </h2>

          <div className="
            absolute top-1/2 -translate-y-1/2 right-1/2 sm:right-4 translate-x-1/2 sm:translate-x-0
            text-8xl leading-[4.1rem] sm:text-9xl sm:leading-[5.5rem] text-light/10 dark:text-dark/10 uppercase whitespace-nowrap select-none
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
            <h3 className="text-3xl tracking-wider leading-6 text-right font-sketch font-bold normal-case select-none">
              Have A Nice Day
            </h3>
          </div>
        </div>
      </div>

      <Ticker
        direction="right"
        slides={[
          <p key="1">Linkai Wu &copy; {new Date().getFullYear()}</p>,
          <p key="2">( ^-^)_旦 pancakes?</p>,
          <p key="3">Linkai Wu &copy; {new Date().getFullYear()}</p>,
          <p key="4">ᕕ( ᐛ )ᕗ going for a walk</p>,
          <p key="5">Linkai Wu &copy; {new Date().getFullYear()}</p>,
          <p key="6">d[o_0]b beep boop</p>,
          <p key="7">Linkai Wu &copy; {new Date().getFullYear()}</p>,
          <p key="8">ᒡ◯ᵔøᒢ oh no my glasses!</p>,
        ]}
        className="text-dark/25 dark:text-light/25 text-base font-mono tracking-tight uppercase select-none"
      />
    </footer>
  );
}
