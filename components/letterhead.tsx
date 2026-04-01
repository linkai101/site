"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";
import { TableOfContents } from "./table-of-contents";

interface LetterheadProps {
  children: React.ReactNode;
  title: string;
  label: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  meta?: {
    label: string;
    value: React.ReactNode;
  }[];
};

export function Letterhead({ children, title, label, thumbnail, thumbnailAlt, meta }: LetterheadProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="container max-w-6xl px-6 pt-6 lg:pt-12 pb-12 flex flex-col lg:flex-row gap-12 lg:gap-16"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div
        className="lg:w-60"
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
      >
        <div className="sticky top-12">
          <Link href="/">
            <Button
              aria-label="Back to homepage"
              variant="link"
              className="group gap-1 p-0! text-xl lg:text-lg font-semibold"
            >
              <ArrowLeft className="size-6 lg:size-5 transition-all duration-300 group-hover:-translate-x-1" />
              {"Back"}
            </Button>
          </Link>

          <div className="hidden lg:block">
            <TableOfContents contentRef={contentRef} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex-1"
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
      >
        <p className="text-muted font-mono uppercase">
          {label}
        </p>

        <h1 className="text-4xl lg:text-5xl font-bold mt-1.5">
          {title}
        </h1>

        {thumbnail &&
          <img src={thumbnail} alt={thumbnailAlt} className="w-full mt-8"/>
        }

        {meta && meta.length > 0 && (
          <div className="grid gap-6 mt-8" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(140px, 100%), 1fr))` }}>
            {meta.map((col) => (
              <div key={col.label}>
                <p className="text-sm text-muted font-mono font-medium uppercase">{col.label}</p>
                <div className="mt-1">{col.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-24" ref={contentRef}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
