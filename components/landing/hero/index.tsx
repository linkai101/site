"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue, animate } from "motion/react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { LinkaiOS } from "./linkai-os";
import { GrainedBackground } from "@/components/ui/grained";

export function DesktopHeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const smoothYProgress = useSpring(scrollYProgress, { mass: 0.1, damping: 10 });

  const [atTop, setAtTop] = useState(true);

  const borderWidth = useMotionValue(0);
  const screenOpacity = useMotionValue(1);
  const notchOpacity = useMotionValue(0);
  const notchY = useMotionValue(-12);
  // Refs track the last threshold state so animate() only fires on crossing, not every frame
  const atEndRef = useRef(false);
  const screenDimRef = useRef(false);
  const notchVisibleRef = useRef(false);
  useMotionValueEvent(smoothYProgress, "change", (v) => {
    const isAtTop = v === 0;
    if (isAtTop !== atTop) setAtTop(isAtTop);

    if ((v >= 1) !== atEndRef.current) {
      atEndRef.current = v >= 1;
      animate(borderWidth, atEndRef.current ? 1 : 0, { duration: 0.5, ease: "easeInOut" });
    }
    if ((v >= 0.9) !== screenDimRef.current) {
      screenDimRef.current = v >= 0.9;
      animate(screenOpacity, screenDimRef.current ? 0.2 : 1, { duration: 0.5, ease: "easeInOut" });
    }
    if ((v > 0.05) !== notchVisibleRef.current) {
      notchVisibleRef.current = v > 0.05;
      animate(notchOpacity, notchVisibleRef.current ? 1 : 0, { duration: 0.25, ease: "easeInOut" });
      animate(notchY, notchVisibleRef.current ? 0 : -12, { duration: 0.25, ease: "easeInOut" });
    }
  });

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

  const outerPadding = useTransform(smoothYProgress, [0.95, 1], [0, 24]);
  const laptopScale = useTransform(smoothYProgress, [0, 1], [1, 0.7]);
  const lidRotateX = useTransform(smoothYProgress, [0, 0.4, 1], [0, 10, 25]);
  const screenWidth = useTransform(smoothYProgress, [0, 0.8], [viewportWidth, 1512]);
  const screenHeight = useTransform(smoothYProgress, [0, 0.8], [viewportHeight, 982]);
  const screenBorderRadius = useTransform(smoothYProgress, [0, 0.05], [0, 16]);
  const thicknessZ = useTransform(screenHeight, h => h + 78 - 28);

  return (
    <motion.div
      ref={heroRef}
      className="h-[200dvh] relative"
      style={{ paddingLeft: outerPadding, paddingRight: outerPadding, paddingTop: outerPadding }}
    >
      <motion.div
        className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden border-primary/30"
        style={{ borderWidth }}
      >
        <Image src="/assets/wallpaper.png" alt="Wallpaper" fill className="object-cover" priority />
        
        {/* LAPTOP */}
        <motion.div
          className="perspective-[4000px]"
          style={{ scale: laptopScale }}
        >
          {/* LAPTOP LID */}
          <motion.div
            className={cn(
              "pt-6 pb-12 px-6 bg-zinc-800 rounded-t-[3rem] rounded-b-2xl border-x-6 border-t-6 border-zinc-500 origin-bottom backface-hidden transform-3d",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
            style={{ rotateX: lidRotateX }}
          >
            {/* LAPTOP SCREEN */}
            <motion.div
              className="relative overflow-hidden"
              style={{
                width: screenWidth,
                height: screenHeight,
                borderTopLeftRadius: screenBorderRadius,
                borderTopRightRadius: screenBorderRadius,
                opacity: screenOpacity,
              }}
              // scroll into focus when clicked
              onPointerDown={() => heroRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })}
            >
              <LinkaiOS allowInteraction={atTop} isLoaded={isLoaded}/>
              <GrainedBackground className="absolute inset-0 pointer-events-none"/>
            </motion.div>

            {/* LAPTOP NOTCH */}
            <motion.div
              className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-8 bg-zinc-800 rounded-b-xl z-10"
              // show when scrolled past 5%
              style={{ opacity: notchOpacity, y: notchY }}
            />
          </motion.div>

          {/* LAPTOP BACK */}
          {/* <motion.div
            className={cn(
              "absolute inset-x-0 bottom-0 top-2 bg-zinc-500 rounded-[3rem] origin-bottom -translate-y-2 transform-3d -z-10",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
            style={{
              rotateX: useTransform(smoothYProgress, [0, 0.4, 1], [0, 10, 25]),
            }}
          /> */}

          {/* LAPTOP BASE */}
          <div // top
            className={cn(
              "absolute inset-0 bg-zinc-600 rounded-[3rem] origin-bottom rotate-x-[-90deg] -z-20",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
          >
            {/* keyboard */}
            <div className="absolute bottom-24 inset-x-16 h-1/2 rounded-2xl bg-zinc-700"/>
            {/* trackpad */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 h-[calc(50%-10rem-3rem)] w-1/3 rounded-2xl bg-zinc-500/50 border-2 border-zinc-500"/>
          </div>
          <div // bottom
            className={cn(
              "absolute inset-0 bg-zinc-700 rounded-[3rem] origin-bottom rotate-x-[-90deg] translate-y-10 -z-30",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
          />
          <motion.div // thickness
            className={cn(
              "absolute bottom-0 inset-x-[3px] h-10 bg-zinc-700 origin-bottom translate-y-10 -z-30",
              "-mt-6 -mb-[calc(3rem-6px)] -mx-6" // margin to offset positioning when expanded
            )}
            style={{ translateZ: thicknessZ }}
          />
        </motion.div>

        {/* Loading screen */}
        <AnimatePresence onExitComplete={() => setIsLoaded(true)}>
          {isLoading && (
            <motion.div
              className="absolute inset-0 z-50 bg-primary text-primary-foreground flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <motion.img
                src="/assets/logo-white.png"
                alt="Linkai Wu"
                className="size-24 select-none"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
