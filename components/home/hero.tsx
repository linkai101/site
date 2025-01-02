"use client";
import Window from './window';
import TiltChip from '@/components/ui/tilt-chip';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { TbBrandGithubCopilot, TbBrandLinkedin, TbMail } from "react-icons/tb";

export default function Hero({ className, ...rest }: { className?: string, [key: string]: any }) {
  const constraintsRef = useRef(null);
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
    <div className={cn("min-h-screen relative bg-primary text-light overflow-hidden", className)} {...rest}>
      <div className="absolute left-1/2 top-[calc(50%-3rem)] -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[36rem] flex items-center justify-center">
        <h1 className="pl-[calc(1rem-1.5px)] text-10xl text-light/10 font-sketch uppercase whitespace-nowrap pointer-events-none select-none">
          I&apos;m Linkai
        </h1>
      </div>

      <div ref={constraintsRef} className="invisible absolute top-0 -bottom-[10rem] -inset-x-[10rem] -z-[9999] pointer-events-none"/>

      <Window
        className="absolute top-[calc(50%-21rem)] left-[calc(50%-22rem)] w-[44rem] h-[28rem]"
        dragConstraints={constraintsRef}
        style={{ zIndex: windowOrder[0] }}
        onMouseDown={() => handleWindowMouseDown(0)}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] pointer-events-none">
          <Image
            src="/assets/hero_1.png"
            alt=""
            fill
            priority
          />
        </div>
      </Window>

      <Window
        className="absolute top-[calc(50%-14rem)] left-[calc(50%+3rem)] w-[32rem] h-[24rem]"
        dragConstraints={constraintsRef}
        style={{ zIndex: windowOrder[1] }}
        onMouseDown={() => handleWindowMouseDown(1)}
      >
        <div className="absolute -bottom-[5rem] right-0 w-[70rem] h-[36rem] pointer-events-none">
          <Image
            src="/assets/hero_2.png"
            alt=""
            fill
            priority
          />
        </div>
      </Window>

      <Window
        className="absolute top-[calc(50%-5rem)] left-[calc(50%-35rem)] w-[28rem] h-[20rem]"
        dragConstraints={constraintsRef}
        style={{ zIndex: windowOrder[2] }}
        onMouseDown={() => handleWindowMouseDown(2)}
      >
        <div className="absolute bottom-0 left-0 w-[70rem] h-[36rem] pointer-events-none">
          <Image
            src="/assets/hero_3.png"
            alt=""
            fill
            priority
          />
        </div>
      </Window>

      <Window
        className="absolute top-[calc(50%+4rem)] left-[calc(50%-16rem)] w-[32rem] h-[18rem]"
        dragConstraints={constraintsRef}
        style={{ zIndex: windowOrder[3] }}
        onMouseDown={() => handleWindowMouseDown(3)}
      >
        <div className="h-full p-4 flex flex-col items-center justify-center">
          <p className="text-3xl text-center font-heading uppercase">
            A developer, designer, and student.
          </p>

          <div className="flex justify-center flex-wrap gap-x-3 gap-y-2 mt-3">
            <Link href="https://github.com/linkai101" target="_blank" rel="noopener noreferrer">
              <TiltChip className="flex items-center gap-2 text-sm font-mono font-medium uppercase">
                <TbBrandGithubCopilot size={16}/>
                GitHub
              </TiltChip>
            </Link>

            <Link href="https://www.linkedin.com/in/linkaiwu/" target="_blank" rel="noopener noreferrer">
              <TiltChip className="flex items-center gap-2 text-sm font-mono font-medium uppercase">
                <TbBrandLinkedin size={20} className="-mr-0.5"/>
                LinkedIn
              </TiltChip>
            </Link>

            <Link href="mailto:linkai@linkaiwu.com" target="_blank" rel="noopener noreferrer">
              <TiltChip className="flex items-center gap-2 text-sm font-mono font-medium">
                <div className="-ml-1 px-[4px] py-[1px] bg-primary text-light font-bold uppercase rounded-full">
                  <TbMail size={18}/>
                </div>

                linkai@linkaiwu.com
              </TiltChip>
            </Link>
          </div>

          <Image
            src="/assets/logo_primary.png"
            alt="Linkai's logo"
            width={128}
            height={128}
            className="w-12 h-12 mt-12 opacity-50 pointer-events-none"
          />
        </div>
      </Window>
    </div>
  );
}
