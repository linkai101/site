"use client";

import { useState } from "react";
import { motion, useDragControls } from "motion/react";
import { cn } from "@/lib/utils";

interface WindowProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  zIndex?: number;
  onFocus?: () => void;
}

export function Window({ children, style, className, zIndex, onFocus }: WindowProps) {
  const dragControls = useDragControls();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      className={cn("bg-background text-foreground rounded-xl overflow-hidden shadow-xl border border-primary/30 origin-top", className)}
      style={{ ...style, zIndex }}
      animate={{ opacity: isPressed ? 0.9 : 1, scale: isPressed ? 0.99 : 1 }}
      transition={{ duration: 0.15 }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={onFocus}
    >
      <div
        className="absolute top-0 inset-x-0 p-3 flex items-center gap-2 cursor-grab active:cursor-grabbing"
        onPointerDown={e => { setIsPressed(true); dragControls.start(e); }}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
      >
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
  zIndex?: number;
  onFocus?: () => void;
}

export function CenteredFixedContentWindow({ children, className, innerClassName, offsetX = 0, offsetY = 0, zIndex, onFocus }: CenteredFixedContentWindowProps) {
  return (
    <Window
      className={cn("absolute left-1/2 top-1/2", className)}
      zIndex={zIndex}
      onFocus={onFocus}
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
