"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowUp } from "lucide-react";
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
    <footer className="pt-8">
      <div className="container max-w-[104rem] px-6 pb-6">
        <div className="flex justify-between items-center gap-12 p-4 border border-primary/30">
          <div>
            <p className="font-medium">
              {"You've reached the end."}
            </p>

            <p className="text-sm text-muted">
              {"Last updated March 2026."}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Button
              onClick={handleJumpToTop}
              aria-label="Jump to top"
              variant="link"
              className="group h-auto gap-1 p-0! text-base font-semibold"
            >
              {"Jump to top"}
              <ArrowUp className="size-0 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:size-5 group-hover:translate-y-0 group-hover:opacity-100" />
            </Button>
          </div>
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