import WindowMobile from './window-mobile';
import MenuBar from './menu-bar';
import TiltChip from '@/components/ui/tilt-chip';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { TbBrandGithubCopilot, TbBrandLinkedin, TbMail } from "react-icons/tb";

export default function HeroMobile({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <div className={cn("min-h-dvh relative bg-primary text-light overflow-hidden", className)} {...rest}>
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
              priority
            />
          </div>
        </WindowMobile>

        <WindowMobile className="absolute top-[calc(50%-14rem)] left-[calc(50%+3rem)] w-[32rem] h-[24rem]">
          <div className="absolute -bottom-[5rem] right-0 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_2.png"
              alt=""
              fill
              priority
            />
          </div>
        </WindowMobile>

        <WindowMobile className="absolute top-[calc(50%-5rem)] left-[calc(50%-35rem)] w-[28rem] h-[20rem]">
          <div className="absolute bottom-0 left-0 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_3.png"
              alt=""
              fill
              priority
            />
          </div>
        </WindowMobile>

        <WindowMobile className="absolute top-[calc(50%+4rem)] left-[calc(50%-16rem)] w-[32rem] h-[18rem]">
          <div className="h-full p-4 flex flex-col items-center justify-center">
            <p className="text-3xl text-center font-heading">
              A developer, designer, and student.
            </p>

            <div className="px-8 pb-8 flex justify-center flex-wrap gap-x-3 gap-y-2 scale-150 mt-10">
              <Link href="https://github.com/linkai101" target="_blank" rel="noopener noreferrer">
                <TiltChip className="flex items-center gap-2 text-sm font-mono uppercase">
                  <TbBrandGithubCopilot size={16}/>
                  GitHub
                </TiltChip>
              </Link>

              <Link href="https://www.linkedin.com/in/linkaiwu/" target="_blank" rel="noopener noreferrer">
                <TiltChip className="flex items-center gap-2 text-sm font-mono uppercase">
                  <TbBrandLinkedin size={20} className="-mr-0.5"/>
                  LinkedIn
                </TiltChip>
              </Link>

              <Link href="mailto:linkai@linkaiwu.com" target="_blank" rel="noopener noreferrer">
                <TiltChip className="flex items-center gap-2 text-sm font-mono">
                  <div className="-ml-1 px-[4px] py-[1px] bg-primary text-light font-bold uppercase rounded-full">
                    <TbMail size={18}/>
                  </div>
                  {/* <div className="-ml-1 px-1.5 bg-primary text-light font-bold uppercase rounded-full">
                    Email me!
                  </div> */}

                  linkai@linkaiwu.com
                </TiltChip>
              </Link>
            </div>
          </div>
        </WindowMobile>
      </div>
    </div>
  );
}
