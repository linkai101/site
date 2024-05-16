"use client";

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function TiltChip({ children, className, ...rest }: { children?: any, className?: string, [key: string]: any }) {
  return (
    <motion.div className="bg-dark/75 rounded-full">
      <motion.div
        className={cn("text-dark bg-light rounded-full origin-left border border-dark/75", className)}
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
