"use client";
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import ContrastLink from '@/components/ui/contrast-link';

export default function Card({ project, className, ...rest }: { project: any, className?: string, [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isActive, setIsActive] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  return (
    <motion.div
      className={cn("relative bg-primary/10 rounded-xl overflow-hidden select-none md:select-auto shadow-inner focus:outline-primary", className)}
      ref={ref}
      initial="hidden"
      animate={isInView ? (isActive ? ["visible", "active"] : "visible") : "hidden"}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => {
        if (window.getSelection()?.toString()) return; // if selecting text, don't hide
        setIsActive(false);
      }}
      onTap={() => {
        if (window.getSelection()?.toString()) return; // if selecting text, don't hide
        setIsActive(state => !state);
      }}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.7,
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring',
            delay: Math.random() * 0.2,
            duration: 0.5,
          }
        },
      }}
      {...rest}
    >
      <motion.div
        key={project.title}
        className="absolute inset-0 rounded-xl overflow-hidden shadow-md z-10"
        variants={{
          active: {
            translateY: -(descriptionRef.current?.clientHeight || 0),
            transition: {
              type: 'spring',
              duration: 0.5,
            }
          },
        }}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover object-center pointer-events-none"
        />

        {/* GRADIENT */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/25 to-dark/70"
          initial={{
            opacity: 0,
          }}
          variants={{
            active: {
              opacity: 1,
              transition: {
                duration: 0.5,
              }
            },
          }}
        />
        
        {/* PROJECT INFO */}
        <motion.div
          className="absolute w-full bottom-0 px-4 py-2"
          initial={{
            translateY: "100%",
            opacity: 0,
          }}
          variants={{
            active: {
              translateY: "0",
              opacity: 1,
              transition: {
                type: 'spring',
                delay: 0.2,
                duration: 0.5,
              }
            },
          }}
        >
          <h2 className="text-lg leading-5 lg:text-xl lg:leading-5 text-light font-mono font-bold uppercase">
            {project.title}
          </h2>

          <div className="flex items-end justify-between gap-2">
            <p className="text-sm leading-4 text-light/70 font-mono uppercase">
              {project.tagline}
            </p>
            <p className="text-light text-sm leading-5 font-mono font-bold uppercase">
              [{project.tags[0]}]
            </p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* PROJECT DESCRIPTION  */}
      <div
        className={cn("absolute bottom-0 inset-x-0 px-4 py-2 pt-4 flex flex-col items-center gap-2", project.wide ? "md:flex-row md:items-end md:justify-end" : "")}
        ref={descriptionRef}
      >
        {project.description &&
          <p className="w-full md:w-auto flex-1 text-sm leading-4 text-dark font-mono">
            {project.description}
          </p>
        }

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
      </div>
    </motion.div>
  );
}
