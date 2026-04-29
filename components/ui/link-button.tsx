import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function LinkButton({ href, isExternal, className, children }: { href: string; isExternal?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
      <Button
        variant="link"
        className={cn("group h-auto p-0! text-base font-semibold", className)}
      >
        {children}
        <ArrowUpRight className="size-0 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:size-[1.25em] group-hover:translate-y-0 group-hover:opacity-100" />
      </Button>
    </Link>
  );
}
