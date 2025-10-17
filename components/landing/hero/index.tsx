"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "motion/react";
import { LinkaiOS } from "./linkai-os";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const smoothYProgress = useSpring(scrollYProgress, { mass: 0.1, damping: 10 });

  const [portionScrolled, setPortionScrolled] = useState(0);
  useMotionValueEvent(smoothYProgress, "change", (latest: number) => setPortionScrolled(latest));

  return (
    <div>
      <div ref={heroRef} className="h-[300dvh] relative">
        <motion.div
          className="sticky top-0 h-dvh"
          style={{
            rotateY: useTransform(smoothYProgress, [0, 0.8], [0, 30]),
            skewX: useTransform(smoothYProgress, [0, 0.8], [0, 10]),
            x: useTransform(smoothYProgress, [0, 0.8], [0, -200]),
            scale: useTransform(smoothYProgress, [0, 0.8], [1, 0.4]),
          }}
        >
          {/* LAPTOP SCREEN */}
          <motion.div
            className="h-full overflow-hidden"
            animate={{
              borderTopLeftRadius: portionScrolled > 0 ? 16 : 0,
              borderTopRightRadius: portionScrolled > 0 ? 16 : 0,
              opacity: portionScrolled < 0.8 ? 1 : 0.2,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            // scroll into focus when clicked
            onPointerDown={() => heroRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })}
          >
            <LinkaiOS/>
          </motion.div>

          {/* LAPTOP FRAME */}
          <motion.div
            className="absolute -top-8 -bottom-12 -left-[calc(2rem+12px)] -right-8 bg-zinc-800 rounded-t-[3rem] border-l-12 border-zinc-500 -z-10"
            // show when scrolled past 0
            animate={{ opacity: portionScrolled > 0 ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* LAPTOP NOTCH */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-zinc-800 rounded-b-xl"
            // show when scrolled past 0
            animate={{ opacity: portionScrolled > 0.05 ? 1 : 0, y: portionScrolled > 0.05 ? 0 : -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
          
          {/* LAPTOP KEYBOARD */}
          <motion.div
            className="absolute top-[calc(100%+6rem)] -left-[calc(2rem+12px)] -right-8 h-32 bg-zinc-600 origin-top-left rotate-x-[60deg] skew-x-[80deg]"
          />
          <motion.div className="absolute top-[calc(100%+3rem)] -left-[calc(2rem+12px)] -right-8 h-[3rem] bg-zinc-600 origin-top-left rotate-[1.57deg] scale-x-[1.45] rounded-b-xl"/>
          <motion.div
            className="absolute top-[calc(100%+3rem)] -left-[calc(2rem+12px)] -right-8 h-32 bg-zinc-500 origin-top-left rotate-x-[60deg] skew-x-[80deg]" //  rotate-x-[60deg] skew-x-[80deg]
          />
        </motion.div>
      </div>
    </div>
  );
}
