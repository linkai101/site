"use client";

import Link from "next/link";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowUp, SquareArrowOutUpRight, ArrowUpRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export function Footer() {
  const tickerItems = Array.from({ length: 10 }, (_, index) => (
    <p key={index}>Linkai Wu &copy; {new Date().getFullYear()}</p>
  ));

  const handleJumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative pt-6">
      <div className="px-6 py-3 border-t border-primary/30">
        <div className="flex item-center justify-center gap-5">
          <Link href="https://www.linkedin.com/in/linkaiwu/" target="_blank" rel="noopener noreferrer">
            <Button
              aria-label="LinkedIn"
              variant="link"
              className="group h-auto gap-1.5 p-0! text-sm font-mono uppercase font-medium text-primary"
            >
              {"LinkedIn"}
              <ArrowUpRight className="size-0 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:size-4 group-hover:translate-y-0 group-hover:opacity-100" />
            </Button>
          </Link>

          <Link href="mailto:linkai@linkaiwu.com" target="_blank" rel="noopener noreferrer">
            <Button
              aria-label="Email"
              variant="link"
              className="group h-auto gap-1.5 p-0! text-sm font-mono uppercase font-medium text-primary"
            >
              {"Email"}
              <ArrowUpRight className="size-0 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:size-4 group-hover:translate-y-0 group-hover:opacity-100" />
            </Button>
          </Link>

          <p className="text-sm text-primary/30">
            {"|"}
          </p>

          <Button
            onClick={handleJumpToTop}
            aria-label="Jump to top"
            variant="link"
            className="group h-auto gap-1.5 p-0! text-sm font-mono uppercase text-muted"
          >
            {"Jump to top"}
            <ArrowUp className="size-0 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:size-4 group-hover:translate-y-0 group-hover:opacity-100" />
          </Button>
        </div>
      </div>

      {/* TICKER */}
      <div className="bg-primary text-primary-foreground">
        <div className="relative container max-w-[104rem] font-mono uppercase py-1">
          <Ticker items={tickerItems} />

          {/* Fade in/out */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-primary to-transparent z-10"/>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-primary to-transparent z-10"/>
        </div>
      </div>
    </footer>
  );
}

function Ticker({ items }: { items: React.ReactNode[] }) {
  return (
    <Carousel
      opts={{
        loop: true,
        watchDrag: false,
      }}
      plugins={[
        AutoScroll({
          playOnInit: true,
          speed: 0.5,
          stopOnMouseEnter: true,
          stopOnFocusIn: false,
          stopOnInteraction: false,
          startDelay: 0,
        }),
      ]}
      className="relative overflow-hidden select-none"
    >
      <CarouselContent className="ml-0 items-center">
        {items.map((item, index) => (
          <CarouselItem key={index} className="relative basis-auto pl-20">
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}