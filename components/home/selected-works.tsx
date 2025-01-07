"use client";
import Image from 'next/image';
import { useRef, Fragment } from 'react';
import { motion, useInView } from 'framer-motion';
import ContrastLink from '@/components/ui/contrast-link';

import { cn } from '@/lib/utils';

const featured = [
  {
    title: 'Badgerfly',
    tagline: 'Website',
    tags: ['figma', 'ux', 'framer'],
    description: 'The website for UW-Madison\'s competitive drone team, designed in Figma and developed in Framer.',
    thumbnail: '/assets/portfolio/badgerfly.png',
    url: 'https://badger-fly.com',
  },
  {
    title: 'STEM to the Sky',
    tagline: 'Website & CMS',
    tags: ['dev', 'ux'],
    description: 'The website for a nonprofit that promotes STEM careers to students.',
    thumbnail: '/assets/portfolio/stemtothesky.png',
    url: 'https://stemtothesky.org',
  },
  {
    title: 'Wisconsin Robotics',
    tagline: 'Website & outreach',
    tags: ['dev', 'ux', 'electrical'],
    description: 'The website for UW-Madison\'s competitive robotics team. I also did CAD and electrical design for a few outreach projects!',
    thumbnail: '/assets/portfolio/wisconsinrobotics.png',
    url: 'https://wisconsinrobotics.org',
  },
  {
    title: 'Boba Barista',
    tagline: '3D modeling',
    tags: ['3d'],
    description: 'A character I designed for a 3D art project incorporating a few of my favorite things!',
    thumbnail: '/assets/portfolio/redpandabobabarista.png',
    wide: true,
  },
];

export default function SelectedWorks({ className, ...rest }: { className?: string, [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      className={cn("pt-24 pb-36 px-4 relative overflow-hidden", className)}
      
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...rest}
    >
      <motion.h2
        className="container max-w-3xl text-6xl text-center font-heading"
        ref={ref}
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.9,
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              duration: 1,
            }
          },
        }}
      >
        The{' '}
        <span className="relative text-primary font-cursive">
          intersection
          <BgArc width={50} height={20} className="absolute -bottom-[2rem] left-1/2 -translate-x-[calc(50%-1rem)] w-[50rem] -rotate-[10deg] -z-50"/>
          <BgArc width={100} height={60} className="absolute -top-[2rem] left-1/2 -translate-x-[calc(50%-2rem)] w-[100rem] rotate-[170deg] -z-50"/>
        </span>
        {' '}of tech, art, and people is where I like to be.
      </motion.h2>

      <div className="container max-w-5xl flex flex-col gap-12 md:gap-24 mt-16 md:mt-24">
        {featured.map((project, i) => <Fragment key={project.title}>
          <Card
            className={cn(i % 2 === 0 ? "mr-auto md:-rotate-1" : "ml-auto md:rotate-2", "hidden md:block w-full max-w-3xl")}
            project={project}
            i={i}
          />
          <CardMobile
            className={cn(i % 2 === 0 ? "mr-auto md:-rotate-1" : "ml-auto md:rotate-2", "block md:hidden w-full max-w-3xl")}
            project={project}
            i={i}
          />
        </Fragment>)}

        <PortfolioCard
          className={cn(featured.length % 2 === 0 ? "md:mr-auto md:-rotate-1" : "md:ml-auto md:rotate-2", "mt-4 md:mt-0")}
        />
      </div>
    </motion.div>
  );
}

function BgArc({ width, height, ...rest }: { width: number, height: number, [key: string]: any }) {
  return (
    <motion.svg viewBox={`0 0 ${width} ${height+2}`} xmlns="http://www.w3.org/2000/svg" {...rest}>
      <motion.path
        variants={{
          hidden: {
            pathLength: 0,
          },
          visible: {
            pathLength: 1,
            transition: {
              type: 'spring',
              duration: 4,
              delay: 0.2,
            }
          },
        }}
        fill="transparent"
        stroke="#C7956D"
        strokeOpacity={0.2}
        strokeWidth={0.25}
        d={`M0,1 Q${width/2},${height*2+1} ${width},1`}
      />
    </motion.svg>
  );
}

function Card({ project, i, className, ...rest }: { project: any, i: number, className?: string, [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      className={className}
      ref={ref}
    >
      <motion.div
        className="h-full pr-3 pl-5 py-3 md:aspect-video flex flex-col md:flex-row gap-8 border-2 border-light/5 rounded-xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {
            opacity: 0,
            translateY: 80,
            scale: 0.9,
          },
          visible: {
            opacity: 1,
            translateY: 0,
            scale: 1,
            transition: {
              type: 'spring',
              duration: 0.5,
            }
          },
        }}
        {...rest}
      >
        <div className="max-w-48 flex flex-col justify-between gap-4 pt-4">
          <div>
            <h3 className="text-3xl leading-8 text-primary font-mono font-bold uppercase">
              {project.title}
            </h3>

            <p className="text-sm leading-4 text-primary/50 font-mono mt-3">
              {project.description}
            </p>

            {project.url &&
              <ContrastLink
                href={project.url}
                className="text-2xl text-primary hover:text-light font-heading whitespace-nowrap mt-6"
                innerClassName="bg-primary"
                target={project.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                Learn more
              </ContrastLink>
            }
          </div>

          <p className="text-sm text-primary leading-5 font-mono font-semibold uppercase">
            [{project.tags.join(' / ')}]
          </p>
        </div>

        <div className="flex-1 aspect-video md:aspect-auto relative bg-light/10 rounded-xl overflow-hidden -z-[1]"> {/* THUMBNAIL */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover object-center"
          />
        </div>
      </motion.div>
    </div>
  );
}

function CardMobile({ project, i, className, ...rest }: { project: any, i: number, className?: string, [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      className={className}
      ref={ref}
    >
      <motion.div
        className="h-full px-5 pt-7 pb-5 md:aspect-video flex flex-col md:flex-row gap-8 border-2 border-light/5 rounded-xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              type: 'spring',
              duration: 1.2,
            }
          },
        }}
        {...rest}
      >
        <div>
          <h3 className="text-3xl leading-8 text-primary font-mono font-bold uppercase">
            {project.title}
          </h3>

          <p className="text-sm leading-4 text-primary/50 font-mono mt-2">
            {project.description}
          </p>

          <div className="flex-1 aspect-video md:aspect-auto relative bg-light/10 rounded-xl overflow-hidden -z-[1] mt-6"> {/* THUMBNAIL */}
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex items-end justify-end mt-6">
            {project.url &&
              <ContrastLink
                href={project.url}
                className="text-2xl text-primary hover:text-light font-heading whitespace-nowrap"
                innerClassName="bg-primary"
                target={project.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                Learn more
              </ContrastLink>
            }
            
            <p className="flex-1 text-sm text-end text-primary leading-5 font-mono font-semibold uppercase">
              [{project.tags.join(' / ')}]
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PortfolioCard({ ...rest }: { [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            type: 'spring',
            duration: 1.2,
            delay: 0.1,
          }
        },
      }}
      ref={ref}
      {...rest}
    >
      <p className="container max-w-xs text-lg leading-6 text-center font-mono uppercase">
        Designing, developing, and learning for meaningful impact.
      </p>

      <p className="text-center mt-8">
        <ContrastLink href="/portfolio" className="text-5xl font-heading">
          View my portfolio
        </ContrastLink>
      </p>
    </motion.div>
  );
}