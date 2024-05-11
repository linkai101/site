"use client";
import Window from './Window';

import Image from 'next/image';
import { useState } from 'react';


export default function Hero() {
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
    <div className="min-h-dvh relative bg-primary text-onPrimary overflow-hidden">
      <div className="absolute top-0 inset-x-0 px-4 flex justify-between text-xs font-mono">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/logo_white.png"
            alt="Linkai's logo"
            width={20}
            height={20}
          />
          
          <p className="font-bold">
            Home
          </p>
        </div>

        <div className="py-0.5 flex items-center gap-2.5">
          <p>
            {new Date().toDateString()}
          </p>

          <p>
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </p>
        </div>
      </div>

      <h1 className="absolute top-[calc(50%-5rem)] -translate-y-1/2 left-1/2 -translate-x-1/2 text-10xl text-light/10 font-sketch uppercase whitespace-nowrap pointer-events-none select-none">
        I&apos;m Linkai
      </h1>

      <Window
        className="absolute top-[calc(50%-21rem)] left-[calc(50%-22rem)] w-[44rem] h-[28rem]"
        style={{ zIndex: windowOrder[0] }}
        onMouseDown={() => handleWindowMouseDown(0)}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 aspect-[3/4] rounded-2xl overflow-hidden -z-[1]">
          <Image
            src="/assets/linkai.png"
            fill
            className="object-cover object-center opacity-20 sepia pointer-events-none"
            alt=""
          />
        </div>

        <div className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2">
          <p className="text-10xl text-dark font-sketch uppercase whitespace-nowrap">
            I&apos;m Linkai
          </p>

          {/* <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[13.5rem] h-[15rem] bg-light/95"/>
          <div className="absolute bottom-0 left-0 w-[10.5rem] h-[9.5rem] bg-light/95"/> */}
        </div>

      </Window>

      <Window
        className="absolute top-[calc(50%-14rem)] left-[calc(50%+4rem)] w-[32rem] h-[24rem]"
        style={{ zIndex: windowOrder[1] }}
        onMouseDown={() => handleWindowMouseDown(1)}
      >
        <p className="absolute top-[1.5rem] right-[calc(100%-13.5rem-1.5px)] text-10xl text-dark font-sketch uppercase whitespace-nowrap">
          I&apos;m Linkai
        </p>
      </Window>

      <Window
        className="absolute top-[calc(50%-7rem)] left-[calc(50%-35rem)] w-[28rem] h-[22rem]"
        style={{ zIndex: windowOrder[2] }}
        onMouseDown={() => handleWindowMouseDown(2)}
      >
        <p className="absolute -top-[5.5rem] -right-[calc(24.5rem+1.5px)] text-10xl text-dark font-sketch uppercase whitespace-nowrap">
          I&apos;m Linkai
        </p>
      </Window>

      <Window
        className="absolute top-[calc(50%+2rem)] left-[calc(50%-16rem)] w-[32rem] h-[18rem]"
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
