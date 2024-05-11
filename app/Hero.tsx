"use client";
import Window from '@/components/Window';
import MenuBar from './MenuBar';

import Image from 'next/image';
import { useState } from 'react';


export default function Hero({ className, ...rest }: { className?: string, [key: string]: any }) {
  const [windowOrder, setWindowOrder] = useState([0, 1, 2, 3]);

  function handleWindowMouseDown(windowI: number) {
    setWindowOrder(order =>
      order.map((z, i) =>
        i === windowI ? 3 // bring clicked window to front
        : z > windowOrder[windowI] ? z-1 // shift anterior windows backwards
        : z // keep posterior windows the same
      )
    );
  }

  return (
    <div className={`min-h-screen relative bg-primary text-onPrimary overflow-hidden ${className}`} {...rest}>
      <MenuBar className="absolute top-0 inset-x-0"/>

      <div className="absolute left-1/2 top-[calc(50%-3rem)] -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[36rem] flex items-center justify-center">
        <h1 className="pl-[calc(1rem-1.5px)] text-10xl text-light/10 font-sketch uppercase whitespace-nowrap pointer-events-none select-none">
          I&apos;m Linkai
        </h1>
      </div>

      <Window
        drag
        className="absolute top-[calc(50%-21rem)] left-[calc(50%-22rem)] w-[44rem] h-[28rem]"
        style={{ zIndex: windowOrder[0] }}
        onMouseDown={() => handleWindowMouseDown(0)}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] pointer-events-none">
          <Image
            src="/assets/hero_1.png"
            alt=""
            fill
          />
        </div>
      </Window>

      <Window
        drag
        className="absolute top-[calc(50%-14rem)] left-[calc(50%+3rem)] w-[32rem] h-[24rem]"
        style={{ zIndex: windowOrder[1] }}
        onMouseDown={() => handleWindowMouseDown(1)}
      >
        <div className="absolute -bottom-[5rem] right-0 w-[70rem] h-[36rem] pointer-events-none">
          <Image
            src="/assets/hero_2.png"
            alt=""
            fill
          />
        </div>
      </Window>

      <Window
        drag
        className="absolute top-[calc(50%-5rem)] left-[calc(50%-35rem)] w-[28rem] h-[20rem]"
        style={{ zIndex: windowOrder[2] }}
        onMouseDown={() => handleWindowMouseDown(2)}
      >
        <div className="absolute bottom-0 left-0 w-[70rem] h-[36rem] pointer-events-none">
          <Image
            src="/assets/hero_3.png"
            alt=""
            fill
          />
        </div>
      </Window>

      <Window
        drag
        className="absolute top-[calc(50%+4rem)] left-[calc(50%-16rem)] w-[32rem] h-[18rem]"
        style={{ zIndex: windowOrder[3] }}
        onMouseDown={() => handleWindowMouseDown(3)}
      >
        <div className="px-4 pt-10">
          <p className="text-3xl text-center font-heading">
            A developer, designer, and student.
          </p>
        </div>
      </Window>
    </div>
  );
}
