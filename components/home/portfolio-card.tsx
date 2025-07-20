"use client";
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TbArrowUpRight, TbExternalLink } from "react-icons/tb";

import type { PortfolioProject } from "@/components/home/portfolio";

export default function PortfolioCard({ project, className, ...rest }: { project: PortfolioProject, className?: string, [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className={cn(project.url && "cursor-pointer", className)}
      ref={ref}
      initial="hidden"
      animate={isInView ? (isActive ? ["visible", "active"] : "visible") : "hidden"}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => {
        if (window.getSelection()?.toString()) return; // if selecting text, don't hide
        setIsActive(false);
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
      <div className="relative rounded-xl overflow-hidden select-none">
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto pointer-events-none"
        />

        {/* TINT */}
        <motion.div
          className="absolute inset-0 bg-dark/5 rounded-xl shadow-inner"
          initial={{
            opacity: 0,
          }}
          variants={{
            active: {
              opacity: project.url ? 1 : 0,
              transition: {
                duration: 0.3,
              }
            },
          }}
        />
      </div>
      
      {/* PROJECT INFO */}
      <div className="mt-3">
        <div className="flex items-center gap-1">
          <motion.h2
            className="text-base md:text-sm leading-tight font-mono font-medium uppercase"
            initial={{
              fontWeight: 500
            }}
            variants={{
              active: {
                fontWeight: 600,
              },
            }}
          >
            {project.title}
          </motion.h2>
          <motion.div
            initial={{
              opacity: 0,
              y: 2,
            }}
            variants={{
              active: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            {(project.url && project.urlIsExternal) && <TbExternalLink strokeWidth={2.5} className="mx-0.5"/>}
            {(project.url && !project.urlIsExternal) && <TbArrowUpRight strokeWidth={2.5}/>}
          </motion.div>
        </div>

        <motion.p
          className="text-sm text-dark/25 leading-tight font-mono uppercase"
          initial={{
            fontWeight: 400,
          }}
          variants={{
            active: {
              fontWeight: 500,
            },
          }}
        >
          {project.tagline}
        </motion.p>
      </div>
    </motion.div>
  );
}