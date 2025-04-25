"use client";
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import ContrastLink from '@/components/ui/contrast-link';
import { TbArrowUpRight } from "react-icons/tb";
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
      <div className="relative rounded-xl overflow-hidden">
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
          className="absolute inset-0 bg-dark/5"
          initial={{
            opacity: 0,
          }}
          variants={{
            active: {
              opacity: project.url ? 1 : 0,
              transition: {
                duration: 0.3,
                delay: 0,
              }
            },
          }}
        />
      </div>
      
      {/* PROJECT TITLE */}
      <div className="mt-3">
        <div className="flex items-center gap-1">
          <h2 className="text-sm leading-tight font-mono font-semibold uppercase">
            {project.title}
          </h2>
          {(project.url && project.urlIsExternal) && <TbArrowUpRight strokeWidth={2.5}/>}
        </div>

        <p className="text-sm text-dark/25 leading-tight font-mono uppercase">
          {project.tagline}
        </p>
      </div>
    </motion.div>
  );
}