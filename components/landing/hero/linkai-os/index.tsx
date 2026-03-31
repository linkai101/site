"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Window, CenteredFixedContentWindow } from "./window";

interface LinkaiOSProps {
  allowInteraction?: boolean;
}

export function LinkaiOS({ allowInteraction = true }: LinkaiOSProps) {
  const [windowOrder, setWindowOrder] = useState([0, 1, 2, 3]);

  const bringToFront = useCallback((id: number) => {
    setWindowOrder(prev => {
      if (prev[prev.length - 1] === id) return prev;
      return [...prev.filter(w => w !== id), id];
    });
  }, []);

  const getWindowZIndex = (id: number) => windowOrder.indexOf(id) + 1;

  return (
    <div className={cn("h-full relative bg-primary text-primary-foreground", allowInteraction ? "pointer-events-auto" : "pointer-events-none")}>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%-4rem)] text-10xl text-nowrap text-primary-foreground/10 font-londrina-solid uppercase select-none">
        {"Linkai Wu"}
      </h1>

      <CenteredFixedContentWindow
        offsetY={-16*7}
        className="w-[43rem] h-[30rem]"
        innerClassName="text-10xl text-nowrap font-londrina-outline uppercase select-none"
        zIndex={getWindowZIndex(0)}
        onFocus={() => bringToFront(0)}
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%-4rem)] text-10xl text-nowrap font-londrina-solid uppercase select-none">
          {"Linkai Wu"}
        </p>
      </CenteredFixedContentWindow>

      <CenteredFixedContentWindow
        offsetX={-16*18}
        offsetY={16*4}
        className="w-[34rem] h-[20rem]"
        innerClassName="text-10xl text-nowrap font-londrina-shadow uppercase select-none"
        zIndex={getWindowZIndex(1)}
        onFocus={() => bringToFront(1)}
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%-4rem)] text-10xl text-nowrap font-londrina-sketch uppercase select-none">
          {"Linkai Wu"}
        </p>
      </CenteredFixedContentWindow>

      <CenteredFixedContentWindow
        offsetX={16*21}
        offsetY={-16*3}
        className="w-[28rem] h-[24rem]"
        innerClassName="text-10xl text-nowrap font-londrina-sketch uppercase select-none"
        zIndex={getWindowZIndex(2)}
        onFocus={() => bringToFront(2)}
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%-4rem)] text-10xl text-nowrap font-londrina-shadow uppercase select-none">
          {"Linkai Wu"}
        </p>
      </CenteredFixedContentWindow>

      <Window
        className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(3rem)] w-[32rem] p-4 pt-12 pb-12"
        zIndex={getWindowZIndex(3)}
        onFocus={() => bringToFront(3)}
      >
        <h2 className="text-2xl font-bold leading-tight">
          {"Hey! I'm Linkai, a student, software engineer, and designer."}
        </h2>

        <p className="text-lg leading-tight mt-4">
          {"I'm currently studying CS at NYU."}
        </p>

        <p className="text-lg leading-tight mt-2.5">
          {"Outside of work and school, I enjoy eating & cooking food, exploring new places, and creating things!"}
        </p>

        <img src="/assets/logo-primary.png" alt="Linkai Wu's logo" className="mx-auto size-12 opacity-50 select-none pointer-events-none mt-6"/>
      </Window>
    </div>
  );
}
