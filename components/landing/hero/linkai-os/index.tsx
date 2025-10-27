"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Window, CenteredFixedContentWindow } from "./window";

interface LinkaiOSProps {
  allowInteraction?: boolean;
}

export function LinkaiOS({ allowInteraction = true }: LinkaiOSProps) {
  return (
    <div className={cn("h-full relative bg-primary text-on-primary", allowInteraction ? "pointer-events-auto" : "pointer-events-none")}>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%-4rem)] text-10xl text-nowrap text-on-primary/10 font-londrina-solid uppercase select-none">
        {"Linkai Wu"}
      </h1>

      <CenteredFixedContentWindow
        offsetY={-16*7}
        className="w-[43rem] h-[30rem]"
        innerClassName="text-10xl text-nowrap font-londrina-outline uppercase select-none"
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
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%-4rem)] text-10xl text-nowrap font-londrina-shadow uppercase select-none">
          {"Linkai Wu"}
        </p>
      </CenteredFixedContentWindow>

      <Window className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%+14rem)] w-[32rem] p-4 pt-12 pb-12">
        <h2 className="text-2xl font-bold leading-tight">
          {"Hey! I'm Linkai, a student"}<sup>1</sup>{", software engineer"}<sup>2</sup>{", and designer"}<sup>3</sup>{"."}
        </h2>

        <p className="text-lg leading-tight mt-4">
          {"I'm currently exploring new mediums for storytelling and function, such as the web, mixed reality, and AI."}
        </p>

        <p className="text-lg leading-tight mt-4">
          {"Outside of work and school, I enjoy touching grass, consuming content, and eating food."}
        </p>

        <p className="text-sm mt-4">
          {"1—Studying computer science at NYU"}<br/>
          {"2—Previously interned at Amazon"}<br/>
          {"3—Aspiring!"}<br/>
        </p>
      </Window>
    </div>
  );
}
