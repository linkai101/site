"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/utils/cn';

export default function Card({ project, className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <motion.div
      className={cn("relative bg-primary/10 rounded-xl overflow-hidden select-none md:select-auto shadow-inner focus:outline-primary", className)}
      // initial="closed"
      whileHover="open"
      whileTap="open"
      {...rest}
    >
      <motion.div className="absolute bottom-0 inset-x-0 px-4 py-2">
        <h2 className="text-lg leading-5 lg:text-xl lg:leading-5 text-primary font-mono font-bold uppercase">
          {project.title}
        </h2>

        <div className="flex items-end justify-between gap-2">
          <p className="text-sm leading-4 text-primary/70 font-mono uppercase">
            {project.description}
          </p>
          <p className="text-primary text-sm leading-5 font-mono font-bold uppercase">
            [{project.tags[0]}]
          </p>
        </div>
      </motion.div>

      <motion.div
        key={project.title}
        className="absolute inset-0 rounded-xl overflow-hidden shadow-md z-20"
        variants={{
          open: {
            translateY: "-4.5rem",
            // bottom: "4.5rem",
            transition: {
              type: 'spring',
              // delay: 0.2,
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
      </motion.div>
    </motion.div>
  );
}
