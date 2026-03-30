"use client";

import Link from "next/link";
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
    <div className="container max-w-6xl px-6 py-12 flex gap-18">
      <div className="w-60">
        <div className="sticky top-12">
          <Link href="/">
            <Button
              aria-label="Back to homepage"
              variant="link"
              className="group gap-1 p-0! text-lg font-semibold"
            >
              <ArrowLeft className="size-5 transition-all duration-300 group-hover:-translate-x-1" />
              {"Back"}
            </Button>
          </Link>

          <TableOfContents contentRef={contentRef} />
        </div>
      </div>

      <div className="flex-1">
        <p className="text-muted font-mono uppercase">
          {label}
        </p>

        <h1 className="text-5xl font-bold mt-1.5">
          {title}
        </h1>

        {thumbnail &&
          <img src={thumbnail} alt={thumbnailAlt} className="w-full mt-8"/>
        }

        {meta && meta.length > 0 && (
          <div className="grid gap-12 mt-8" style={{ gridTemplateColumns: `repeat(${meta.length}, 1fr)` }}>
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
      </div>
    </div>
  );
}
