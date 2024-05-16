"use client";

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function TiltChip({ children, className, ...rest }: { children?: any, className?: string, [key: string]: any }) {
  return (
    <motion.div className="bg-dark rounded-full">
      <motion.div
        className={cn("text-dark bg-light rounded-full origin-left border border-dark", className)}
        whileHover={{
          rotate: -2,
        }}
        {...rest}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
