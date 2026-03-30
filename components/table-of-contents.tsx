"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const els = Array.from(content.querySelectorAll<HTMLElement>("h1, h2, h3"));
    const found = els.map((el) => {
      const text = el.textContent ?? "";
      const id = slugify(text) || `heading-${Math.random().toString(36).slice(2)}`;
      el.id = id;
      return { id, text, level: parseInt(el.tagName[1]) };
    });
    setHeadings(found);
    if (found.length > 0) setActiveId(found[0].id);
  }, [contentRef]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    const content = contentRef.current;
    if (!content) return;
    content.querySelectorAll<HTMLElement>("h1, h2, h3").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings, contentRef]);

  if (headings.length === 0) return null;

  return (
    <ul className="mt-6 flex flex-col gap-2">
      {headings.map(({ id, text, level }) => (
        <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
          <a
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "transition-colors hover:text-foreground",
              level <= 2 ? "text-lg" : "text-base",
              activeId === id ? "text-foreground font-medium" : "text-muted"
            )}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
}
