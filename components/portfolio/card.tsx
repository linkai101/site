"use client";
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ContrastLink from '@/components/ui/contrast-link';

export default function Card({ project, className, ...rest }: { project: any, className?: string, [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className={cn("", className)}
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
          className="absolute inset-0 bg-dark/15"
          initial={{
            opacity: 0,
          }}
          variants={{
            active: {
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.2,
              }
            },
          }}
        />
      </div>
      
      {/* PROJECT TITLE */}
      <div className="mt-3">
        <h2 className="text-base leading-tight font-mono font-semibold uppercase">
          {project.title}
        </h2>

        <p className="text-sm text-dark/25 leading-tight font-mono uppercase">
          {project.tagline}
        </p>
      </div>
    </motion.div>
  );
}
