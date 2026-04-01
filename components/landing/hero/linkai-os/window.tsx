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
  dragConstraints?: React.RefObject<HTMLElement | null>;
  isVisible?: boolean;
  entranceDelay?: number;
}

export function Window({ children, style, className, zIndex, onFocus, dragConstraints, isVisible = true, entranceDelay = 0 }: WindowProps) {
  const dragControls = useDragControls();
  const [isPressed, setIsPressed] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <motion.div
      className={cn("bg-background text-foreground rounded-xl overflow-hidden shadow-xl border border-primary/30 origin-top", className)}
      style={{ ...style, zIndex }}
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={isVisible
        ? { opacity: isPressed ? 0.9 : 1, scale: isPressed ? 0.99 : 1, y: 0 }
        : { opacity: 0, scale: 0.88, y: 24 }
      }
      transition={hasEntered
        ? { duration: 0.15 }
        : { delay: entranceDelay, type: "spring", stiffness: 280, damping: 22 }
      }
      onAnimationComplete={() => { if (isVisible) setHasEntered(true); }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      onPointerDown={onFocus}
    >
      <div
        className="absolute top-0 inset-x-0 p-3 flex items-center gap-2 cursor-grab active:cursor-grabbing z-10"
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
  dragConstraints?: React.RefObject<HTMLElement | null>;
  isVisible?: boolean;
  entranceDelay?: number;
}

export function CenteredFixedContentWindow({ children, className, innerClassName, offsetX = 0, offsetY = 0, zIndex, onFocus, dragConstraints, isVisible, entranceDelay }: CenteredFixedContentWindowProps) {
  return (
    <Window
      className={cn("absolute left-1/2 top-1/2", className)}
      zIndex={zIndex}
      onFocus={onFocus}
      dragConstraints={dragConstraints}
      isVisible={isVisible}
      entranceDelay={entranceDelay}
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
