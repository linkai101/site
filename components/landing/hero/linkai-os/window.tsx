"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface WindowProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Window({ children, style, className }: WindowProps) {
  return (
    <motion.div
      className={cn("bg-background text-foreground rounded-xl overflow-hidden shadow-xl border border-primary/30", className)}
      style={style}
      drag
      dragMomentum={false}
    >
      <div className="absolute top-3 inset-x-3 flex items-center gap-2">
        <div className="size-3.5 rounded-full bg-primary/30"/>
        <div className="size-3.5 rounded-full bg-primary/30"/>
        <div className="size-3.5 rounded-full bg-primary/30"/>
      </div>

      {children}
    </motion.div>
  );
}

interface CenteredFixedContentWindowProps {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  offsetX?: number; // pixels
  offsetY?: number; // pixels
}

export function CenteredFixedContentWindow({ children, className, innerClassName, offsetX = 0, offsetY = 0 }: CenteredFixedContentWindowProps) {
  return (
    <Window
      className={cn("absolute left-1/2 top-1/2", className)}
      style={{
        // calculate translation after center offset and additional offset applied
        translate: `calc(-50% ${offsetX >= 0 ? '+' : '-'} ${Math.abs(offsetX)}px) calc(-50% ${offsetY >= 0 ? '+' : '-'} ${Math.abs(offsetY)}px)`,
      }}
    >
      <div
        className={cn("absolute inset-0", innerClassName)}
        style={{
          // compensate for additional offset
          translate: `${-offsetX}px ${-offsetY}px`,
        }}
      >
        {children}
      </div>
    </Window>
  );
}