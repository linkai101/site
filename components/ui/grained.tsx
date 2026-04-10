"use client";

import { useEffect, useRef } from "react";

interface GrainedProps {
  animate?: boolean;
  patternWidth?: number;
  patternHeight?: number;
  grainOpacity?: number;
  grainDensity?: number;
  grainWidth?: number;
  grainHeight?: number;
  grainChaos?: number;
  grainSpeed?: number;
  className?: string;
}

export function GrainedBackground({
  animate = true,
  patternWidth = 100,
  patternHeight = 100,
  grainOpacity = 0.1,
  grainDensity = 1,
  grainWidth = 1,
  grainHeight = 1,
  grainChaos = 0.2,
  grainSpeed = 10,
  className,
}: GrainedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const id = el.id || `grained-${Math.random().toString(36).substring(2, 15)}`;
    el.id = id;

    if (getComputedStyle(el).position === "static") {
      el.style.position = "relative";
    }

    el.style.overflow = "hidden";

    const prefixes = ["", "-moz-", "-o-", "-webkit-", "-ms-"];
    const settings = {
      animate,
      patternWidth,
      patternHeight,
      grainOpacity,
      grainDensity,
      grainWidth,
      grainHeight,
      grainChaos,
      grainSpeed,
    };

    const createGrain = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = settings.patternWidth;
      canvas.height = settings.patternHeight;

      for (let x = 0; x < canvas.width; x += settings.grainDensity) {
        for (let y = 0; y < canvas.height; y += settings.grainDensity) {
          const rgb = Math.floor(Math.random() * 256);
          ctx.fillStyle = `rgba(${rgb},${rgb},${rgb},${settings.grainOpacity})`;
          ctx.fillRect(x, y, settings.grainWidth, settings.grainHeight);
        }
      }

      return canvas.toDataURL("image/png");
    };

    const keyframes = [
      "0%:-10%,10%", "10%:-25%,0%", "20%:-30%,10%", "30%:-30%,30%",
      "40%::-20%,20%", "50%:-15%,10%", "60%:-20%,20%", "70%:-5%,20%",
      "80%:-25%,5%", "90%:-30%,25%", "100%:-10%,10%"
    ];

    let keyframesCSS = "";
    for (let i = 0; i < prefixes.length; i++) {
      keyframesCSS += `@${prefixes[i]}keyframes grained {`;
      keyframes.forEach(frame => {
        const [percent, transform] = frame.split(":");
        keyframesCSS += `${percent}{${prefixes[i]}transform:translate(${transform});}`;
      });
      keyframesCSS += "}";
    }

    // Remove any existing style tag
    const existing = document.getElementById("grained-animation");
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = "grained-animation";
    style.innerHTML = keyframesCSS;
    document.head.appendChild(style);

    const overlayStyle = document.createElement("style");
    overlayStyle.id = `grained-animation-${id}`;
    const backgroundImage = createGrain();

    let rules = `
      #${id}::before {
        background-image: url(${backgroundImage});
        position: absolute;
        content: "";
        height: 300%;
        width: 300%;
        left: -100%;
        top: -100%;
        z-index: 0;
    `;

    if (settings.animate) {
      prefixes.forEach(prefix => {
        rules += `
          ${prefix}animation-name: grained;
          ${prefix}animation-iteration-count: infinite;
          ${prefix}animation-duration: ${settings.grainChaos}s;
          ${prefix}animation-timing-function: steps(${settings.grainSpeed}, end);
        `;
      });
      rules += `will-change: transform;`;
    }

    rules += `}`;

    overlayStyle.innerHTML = rules;
    document.head.appendChild(overlayStyle);
  }, [
    animate,
    patternWidth,
    patternHeight,
    grainOpacity,
    grainDensity,
    grainWidth,
    grainHeight,
    grainChaos,
    grainSpeed,
  ]);

  return <div ref={containerRef} className={className} />;
};
