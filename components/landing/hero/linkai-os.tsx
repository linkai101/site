"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LinkaiOSProps {
  allowInteraction?: boolean;
}

export function LinkaiOS({ allowInteraction = true }: LinkaiOSProps) {
  return (
    <div className={cn("h-full relative flex items-center justify-center bg-primary text-on-primary", allowInteraction ? "pointer-events-auto" : "pointer-events-none")}>
      <h1 className="text-11xl text-nowrap text-on-primary/10 font-display uppercase select-none">
        {"I'm Linkai"}
      </h1>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-background text-foreground rounded-xl shadow-xl"
        drag
        dragMomentum={false}
      >
        browser
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[20rem] bg-background text-foreground rounded-xl shadow-xl"
        drag
        dragMomentum={false}
      >
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[25rem] bg-background text-foreground rounded-xl shadow-xl"
        drag
        dragMomentum={false}
      >
        notes app
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[18rem] bg-background text-foreground rounded-xl shadow-xl"
        drag
        dragMomentum={false}
      >
        finder (links to socials and etc.)
      </motion.div>
    </div>
  );
}
