"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Window({ children, className, ...rest }: { children?: React.ReactNode, drag?: boolean, className?: string, [key: string]: any }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      ref={ref}
      className={cn("text-dark bg-light rounded-xl shadow-2xl outline-primary overflow-hidden", className)}
      {...rest}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
    >
      <div className="relative h-full">
        <div className="absolute top-2.5 left-2.5 flex gap-2 z-10">
          <div className="h-3.5 w-3.5 bg-red-400 rounded-full"/>
          <div className="h-3.5 w-3.5 bg-yellow-400 rounded-full"/>
          <div className="h-3.5 w-3.5 bg-green-400 rounded-full"/>
        </div>

        {children}
      </div>
    </motion.div>
  );
}
