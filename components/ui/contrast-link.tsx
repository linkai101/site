"use client";

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

import Link from 'next/link';

export default function ContrastLink({ href, children, className, ...rest }: { href: string, children?: React.ReactNode, className?: string, [key: string]: any }) {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        className={cn("inline-block relative", className)}
        initial="initial"
        whileHover="hover"
        variants={{
          initial: { color: '#FCF5ED' },
          hover: { color: '#1F1717' },
        }}
        transition={{ delay: 0.1, duration: 0.2 }}
        {...rest}
      >
        {children}
        <motion.span
          className="absolute bottom-0 inset-x-0 bg-light rounded-sm -z-[1]"
          variants={{
            initial: { height: "2px" },
            hover: { height: '100%' },
          }}
          transition={{ stiffness: 300, duration: 0.3 }}
        />
      </motion.a>
    </Link>
  );
}
