"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { LinkaiOS } from "./linkai-os";
import { GrainedBackground } from "@/components/ui/grained";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const smoothYProgress = useSpring(scrollYProgress, { mass: 0.1, damping: 10 });

  const [portionScrolled, setPortionScrolled] = useState(0);
  useMotionValueEvent(smoothYProgress, "change", (latest: number) => setPortionScrolled(latest));

  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  useEffect(() => {
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <div ref={heroRef} className="h-[300dvh] relative">
      <div className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden">
        {/* LAPTOP */}
        <motion.div
          className="perspective-[4000px]"
          style={{
            scale: useTransform(smoothYProgress, [0, 1], [1, 0.4]),
          }}
        >
          {/* LAPTOP LID */}
          <motion.div
            className={cn(
              "pt-6 pb-12 px-6 bg-zinc-800 rounded-t-[3rem] rounded-b-2xl border-x-6 border-t-6 border-zinc-500 origin-bottom backface-hidden transform-3d",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
            style={{
              rotateX: useTransform(smoothYProgress, [0, 0.4, 1], [0, 10, 25]),
            }}
          >
            {/* LAPTOP SCREEN */}
            <motion.div
              className="relative overflow-hidden"
              style={{
                width: useTransform(smoothYProgress, [0, 0.8], [viewportWidth, 1512]),
                height: useTransform(smoothYProgress, [0, 0.8], [viewportHeight, 982]),
              }}
              animate={{
                borderTopLeftRadius: portionScrolled > 0 ? 16 : 0,
                borderTopRightRadius: portionScrolled > 0 ? 16 : 0,
                opacity: portionScrolled < 0.9 ? 1 : 0.2,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              // scroll into focus when clicked
              onPointerDown={() => heroRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })}
            >
              <LinkaiOS allowInteraction={portionScrolled === 0}/>
              <GrainedBackground className="absolute inset-0 pointer-events-none"/>
            </motion.div>

            {/* LAPTOP NOTCH */}
            <motion.div
              className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-8 bg-zinc-800 rounded-b-xl z-10"
              // show when scrolled past 0
              animate={{ opacity: portionScrolled > 0.05 ? 1 : 0, y: portionScrolled > 0.05 ? 0 : -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
          </motion.div>

          {/* LAPTOP BACK */}
          <motion.div
            className={cn(
              "absolute inset-x-0 bottom-0 top-2 bg-zinc-500 rounded-[3rem] origin-bottom -translate-y-2 transform-3d -z-10",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
            style={{
              rotateX: useTransform(smoothYProgress, [0, 0.4, 1], [0, 10, 25]),
            }}
          >
            {/* <motion.div // thickness
              className={cn(
                "absolute top-0 inset-x-[3rem] h-3 bg-zinc-500 origin-top rotate-x-[90deg] z-10",
              )}
            /> */}

            {/* a sad attempt at rounded corners (angled corners) */}
            {/* <motion.div
              className={cn(
                "absolute top-[3rem] left-0 h-3 w-[68px] origin-top-left bg-zinc-500 rotate-x-[90deg] rotate-y-[-45deg] z-10",
              )}
            />
            <motion.div
              className={cn(
                "absolute top-[3rem] right-0 h-3 w-[68px] origin-top-right bg-zinc-500 rotate-x-[90deg] rotate-y-[45deg] z-10",
              )}
            /> */}
          </motion.div>

          {/* LAPTOP BASE */}
          <motion.div // top
            className={cn(
              "absolute inset-0 bg-zinc-600 rounded-[3rem] origin-bottom rotate-x-[-90deg] -z-20",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
          >
            {/* keyboard */}
            <div className="absolute bottom-24 inset-x-16 h-1/2 rounded-2xl bg-zinc-700"/>
            {/* trackpad */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 h-[calc(50%-10rem-3rem)] w-1/3 rounded-2xl bg-zinc-500/50 border-2 border-zinc-500"/>
          </motion.div>
          <motion.div // bottom
            className={cn(
              "absolute inset-0 bg-zinc-700 rounded-[3rem] origin-bottom rotate-x-[-90deg] translate-y-10 -z-30",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
          />
          <motion.div // thickness
            className={cn(
              "absolute bottom-0 inset-x-[3px] h-10 bg-zinc-700 origin-bottom translate-y-10 translate-z-[1030px] -z-30",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
          />
        </motion.div>
      </div>
    </div>
  );
}
