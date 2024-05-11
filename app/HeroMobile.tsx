import Window from '@/components/Window';
import MenuBar from './MenuBar';

import Image from 'next/image';

export default function HeroMobile({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <div className={`min-h-screen relative bg-primary text-onPrimary overflow-hidden ${className}`} {...rest}>
      <MenuBar className="absolute top-0 inset-x-0"/>

      <div className="absolute inset-0 scale-[0.7]">
        <h1 className="sr-only">
          I&apos;m Linkai
        </h1>

        <Window className="absolute top-[calc(50%-21rem)] left-[calc(50%-22rem)] w-[44rem] h-[28rem]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_1.png"
              alt=""
              fill
            />
          </div>
        </Window>

        <Window className="absolute top-[calc(50%-14rem)] left-[calc(50%+3rem)] w-[32rem] h-[24rem]">
          <div className="absolute -bottom-[5rem] right-0 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_2.png"
              alt=""
              fill
            />
          </div>
        </Window>

        <Window className="absolute top-[calc(50%-5rem)] left-[calc(50%-35rem)] w-[28rem] h-[20rem]">
          <div className="absolute bottom-0 left-0 w-[70rem] h-[36rem] pointer-events-none">
            <Image
              src="/assets/hero_3.png"
              alt=""
              fill
            />
          </div>
        </Window>

        <Window className="absolute top-[calc(50%+4rem)] left-[calc(50%-16rem)] w-[32rem] h-[18rem]">
          <div className="px-4 pt-10">
            <p className="text-3xl text-center font-heading">
              A developer, designer, and student.
            </p>
          </div>
        </Window>
      </div>
    </div>
  );
}
