import WindowMobile from '@/components/WindowMobile';
import MenuBar from './MenuBar';
import TiltChip from '@/components/ui/tilt-chip';

import Image from 'next/image';
import { cn } from '@/utils/cn';
import { TbArrowUpRight, TbBrandGithubCopilot, TbBrandLinkedin, TbMail } from "react-icons/tb";

export default function HeroMobile({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <div className={cn("min-h-screen relative bg-primary text-onPrimary overflow-hidden", className)} {...rest}>
      <MenuBar className="absolute top-0 inset-x-0"/>

      <div className="absolute inset-0 scale-[0.7]">
        <h1 className="sr-only">
          I&apos;m Linkai
        </h1>

        <WindowMobile className="absolute top-[calc(50%-21rem)] left-[calc(50%-22rem)] w-[44rem] h-[28rem]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_1.png"
              alt=""
              fill
            />
          </div>
        </WindowMobile>

        <WindowMobile className="absolute top-[calc(50%-14rem)] left-[calc(50%+3rem)] w-[32rem] h-[24rem]">
          <div className="absolute -bottom-[5rem] right-0 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_2.png"
              alt=""
              fill
            />
          </div>
        </WindowMobile>

        <WindowMobile className="absolute top-[calc(50%-5rem)] left-[calc(50%-35rem)] w-[28rem] h-[20rem]">
          <div className="absolute bottom-0 left-0 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_3.png"
              alt=""
              fill
            />
          </div>
        </WindowMobile>

        <WindowMobile className="absolute top-[calc(50%+4rem)] left-[calc(50%-16rem)] w-[32rem] h-[18rem]">
          <div className="h-full p-4 flex flex-col items-center justify-center">
            <p className="text-3xl text-center font-heading">
              A developer, designer, and student.
            </p>

          <div className="flex justify-center flex-wrap gap-x-3 gap-y-2 mt-3">
            <TiltChip className="px-1.5 py-[2px] flex items-center gap-2 text-sm font-mono uppercase">
              <TbBrandGithubCopilot size={16}/>
                GitHub
              <TbArrowUpRight size={14} className="-ml-1"/>
            </TiltChip>

            <TiltChip className="px-1.5 py-[2px] flex items-center gap-2 text-sm font-mono uppercase">
              <TbBrandLinkedin size={20} className="-mr-0.5"/>
                LinkedIn
              <TbArrowUpRight size={14} className="-ml-1"/>
            </TiltChip>

            <TiltChip className="pl-[2px] pr-1.5 py-[2px] flex items-center gap-2 text-sm font-mono">
              <div className="px-[4px] py-[1px] bg-primary text-onPrimary font-bold uppercase rounded-full">
                <TbMail size={18}/>
              </div>
              {/* <div className="px-1.5 bg-primary text-onPrimary font-bold uppercase rounded-full">
                Email me!
              </div> */}

              linkai@linkaiwu.com

              <TbArrowUpRight size={14} className="-ml-1"/>
            </TiltChip>
          </div>

          <Image
            src="/assets/logo_primary.png"
            alt="Linkai's logo"
            width={128}
            height={128}
            className="w-12 h-12 mt-12 opacity-50"
          />
          </div>
        </WindowMobile>
      </div>
    </div>
  );
}
