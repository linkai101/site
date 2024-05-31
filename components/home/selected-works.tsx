import Image from 'next/image';
import ContrastLink from '@/components/ui/contrast-link';

import { Fragment } from 'react';
import { cn } from '@/utils/cn';

const featured = [
  {
    title: 'Wisconsin Robotics',
    description: 'Website & outreach',
    tags: ['dev', 'ux', 'electrical'],
    thumbnail: '/assets/portfolio/wisconsinrobotics.png',
    wide: true,
  },
  {
    title: 'STEM to the Sky',
    description: 'Website & CMS',
    tags: ['dev', 'ux'],
    thumbnail: '/assets/portfolio/stemtothesky.png',
  },
  // {
  //   title: 'Oracle of Blair',
  //   description: 'Website & predictive model',
  //   tags: ['data', 'dev', 'ux'],
  //   thumbnail: '/assets/portfolio/oracleofblair.png',
  // },
  {
    title: 'Boba Barista',
    description: '3D character design',
    tags: ['3d'],
    thumbnail: '/assets/portfolio/redpandabobabarista.png',
    wide: true,
  },
];

export default function SelectedWorks({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <div className={cn("pt-24 pb-36 px-2 relative overflow-hidden", className)} {...rest}>
      <h2 className="container max-w-3xl text-6xl text-center font-heading">
        The{' '}
        <span className="relative text-primary font-cursive">
          intersection
          <BgArc width={100} height={60} className="absolute -bottom-[2rem] left-1/2 -translate-x-[calc(50%+2rem)] w-[100rem] -rotate-[10deg] -z-50"/>
          <BgArc width={200} height={150} className="absolute -top-[2.5rem] left-1/2 -translate-x-[calc(50%-9rem)] w-[200rem] rotate-[170deg] -z-50"/>
        </span>
        {' '}of tech, art, and people is where I like to be.
      </h2>

      <div className="container max-w-5xl flex flex-col gap-24 mt-24">
        {featured.map((project, i) => (
          <div className={cn(i % 2 === 0 ? "mr-auto pr-5 pl-3 md:-rotate-2 flex-row-reverse text-right" : "ml-auto pr-3 pl-5 md:rotate-2", "w-full max-w-3xl py-3 aspect-video flex gap-8 border-2 border-light/5 rounded-xl")} key={project.title}>
            <div className="max-w-48 flex flex-col justify-between gap-4 pt-4">
              <div>
                <h3 className="text-3xl leading-8 text-primary font-mono font-bold uppercase">
                  {project.title}
                </h3>
                <p className="leading-5 text-primary/50 font-mono uppercase mt-1">
                  {project.description}
                </p>
              </div>

              <p className="text-sm text-primary leading-5 font-mono font-semibold uppercase">
                [{project.tags.join(' / ')}]
              </p>
            </div>

            <div className="flex-1 relative bg-light/10 rounded-xl overflow-hidden -z-[1]"> {/* THUMBNAIL */}
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}

        <div className={featured.length % 2 === 0 ? "md:mr-auto md:-rotate-2" : "md:ml-auto md:rotate-2"}>
          <p className="container max-w-xs text-lg leading-6 text-center font-mono uppercase">
            Designing, developing, and learning for meaningful impact.
          </p>

          <p className="text-center mt-8">
            <ContrastLink href="/portfolio" className="text-5xl font-heading">
              View my portfolio
            </ContrastLink>
          </p>
        </div>
      </div>
    </div>
  );
}

function BgArc({ width, height, ...rest }: { width: number, height: number, [key: string]: any }) {
  return (
    <svg viewBox={`0 0 ${width} ${height+2}`} xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path fill="transparent" stroke="#C7956D" strokeOpacity="0.2" strokeWidth={0.25} d={`M0,1 Q${width/2},${height*2+1} ${width},1`}></path>
    </svg>
  );
}