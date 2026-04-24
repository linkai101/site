"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useMemo } from "react";

interface PortfolioCardProps {
  src: string;
  alt: string;
  title: string;
  label: string;
  url?: string;
  urlIsExternal?: boolean;
}

export function PortfolioCard({ src, alt, title, label, url, urlIsExternal }: PortfolioCardProps) {
  const delay = useMemo(() => Math.random() * 0.3, []);

  const motionProps = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, ease: "easeOut" as const, delay },
  };

  const content = (
    <>
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full transition-opacity duration-300 group-hover:opacity-95"
        />

        {/* Tint */}
        <div className="absolute inset-0 bg-foreground/5 shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      </div>

      <div className="mt-2.5 flex flex-col sm:flex-row justify-between sm:items-center sm:gap-4">
        <h3 className="text-lg font-medium leading-snug transition-[font-weight] duration-300 group-hover:font-semibold">{title}</h3>
        <p className="text-sm font-mono text-muted uppercase transition-[font-weight] duration-300 group-hover:font-medium">{label}</p>
      </div>
    </>
  );

  if (url) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: "easeOut" as const, delay }}
      >
        <Link
          href={url}
          className="group block"
          {...(urlIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return <motion.div className="group" {...motionProps}>{content}</motion.div>;
}