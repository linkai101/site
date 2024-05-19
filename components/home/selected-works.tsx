import ContrastLink from '@/components/ui/contrast-link';

import { Fragment } from 'react';
import { cn } from '@/utils/cn';

const featured = [
  {
    title: 'Wisconsin Robotics',
    description: 'Website & outreach',
    tag: '[UX / Dev / CAD / Electrical]',
    thumbnail: '',
  },
  {
    title: 'STEM to the Sky',
    description: 'Website & CMS',
    tag: '[UX / Dev]',
    thumbnail: '',
  },
  {
    title: 'Oracle of Blair',
    description: 'Website & predictive model',
    tag: '[UX / Dev / Data]',
    thumbnail: '',
  },
  {
    title: '3D art',
    description: 'Misc. 3D projects',
    tag: '[3D]',
    thumbnail: '',
  },
];

export default function SelectedWorks({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <div className={cn("py-24 px-2 relative overflow-hidden", className)} {...rest}>
      <h2 className="container max-w-3xl text-6xl text-center font-heading">
        The{' '}
        <span className="relative text-primary font-cursive">
          intersection
          <BgArc width={100} height={60} className="absolute -bottom-[2rem] left-1/2 -translate-x-[calc(50%+2rem)] w-[100rem] -rotate-[10deg] -z-[1]"/>
          <BgArc width={200} height={150} className="absolute -top-[2.5rem] left-1/2 -translate-x-[calc(50%-9rem)] w-[200rem] rotate-[170deg] -z-[1]"/>
        </span>
        {' '}of tech, art, and people is where I like to be.
      </h2>

      <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-x-36 lg:gap-x-48 gap-y-24 md:gap-y-12 mt-32">
        {featured.map((project, i) => <Fragment key={project.title}>
          {i%2==0 && <div className="hidden md:block h-32"/>} {/* SPACER */}

          <div className="row-span-2">
            <div className="aspect-video bg-light/20 rounded-lg"/> {/* THUMBNAIL */}

            <div className={cn("flex gap-6 justify-between mt-1", i%2==0 ? "md:-ml-10" : "md:-mr-10 md:flex-row-reverse")}>
              <div className={cn("-mt-6", i%2==1 && "md:text-right")}>
                <h3 className="text-3xl leading-8 text-primary font-mono font-bold uppercase">
                  {project.title}
                </h3>
                <p className="leading-5 text-primary/50 font-mono uppercase">
                  {project.description}
                </p>
              </div>

              <p className={cn("text-right text-primary leading-6 font-mono uppercase", i%2==1 && "md:text-left")}>
                {project.tag}
              </p>
            </div>
          </div>

          {i%2==1 && <div className="hidden md:block h-32"/>} {/* SPACER */}
        </Fragment>)}
        
        <div className="hidden md:block h-48"/> {/* SPACER */}

        <div className="md:-ml-10">
          <p className="container max-w-xs text-lg leading-6 text-center font-mono uppercase">
            Designing, developing, and learning for meaningful impact.
          </p>

          {/* <p className="text-5xl text-center font-heading uppercase underline decoration-2 underline-offset-4 mt-8">
            View my projects
          </p> */}
          <p className="text-center mt-8">
            <ContrastLink href="/portfolio" className="text-5xl font-heading uppercase">
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