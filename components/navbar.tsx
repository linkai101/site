"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function Navbar({ className, ...rest }: { className?: string; [key: string]: any }) {
  const pathname = usePathname();

  return (
    <motion.div
      className={cn("fixed top-3 left-1/2 py-0.5 flex text-light backdrop-blur-sm rounded-xl border border-light/20 overflow-hidden z-20", className)}
      style={{ boxShadow: "inset 0 0 0 3000px rgba(31, 17, 17, 0.3)" }}
      initial={{
        opacity: 0,
        x: "-50%",
        y: -100,
      }}
      animate={{
        opacity: 1,
        x: "-50%",
        y: 0,
        transition: {
          type: "spring",
          duration: 1,
          delay: 0.4,
        }
      }}
      {...rest}
    >
      <div className="px-3 border-r border-light/15">
        <div className="h-10 w-10 relative">
          <Image
            src="/assets/logo_white.png"
            alt="Linkai's logo"
            fill
            className="pointer-events-none"
          />
        </div>
      </div>

      <div className="px-4 py-0.5 flex gap-3">
        <motion.div
          className="h-full px-3 flex items-center text-lg font-heading font-semibold rounded-md hover:bg-light/15 transition-colors duration-300 ease-in-out"
          initial="initial"
          animate={pathname === "/" ? "active" : "initial"}
          whileHover={pathname === "/" ? "active" : "hover"}
          variants={{
            initial: { backgroundColor: "" },
            active: { backgroundColor: "rgb(252 245 237 / 0.15)" },
            hover: { backgroundColor: "rgb(252 245 237 / 0.1)" },
          }}
        >
          <Link
            href="/"
          >
            Home
          </Link>
        </motion.div>

        <motion.div
          className="h-full px-3 flex items-center text-lg font-heading font-semibold rounded-md hover:bg-light/15 transition-colors duration-300 ease-in-out"
          initial="initial"
          animate={pathname === "/portfolio" ? "active" : "initial"}
          whileHover={pathname === "/portfolio" ? "active" : "hover"}
          variants={{
            initial: { backgroundColor: "" },
            active: { backgroundColor: "rgb(252 245 237 / 0.2)" },
            hover: { backgroundColor: "rgb(252 245 237 / 0.1)" },
          }}
        >
          <Link
            href="/portfolio"
          >
            Portfolio
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
