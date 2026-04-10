import Image from "next/image";

export function MobileHeroSection() {
  return (
    <div className="px-6 pt-6">
      <div className="relative w-full h-40 border border-primary/30 shadow-inner">
        <Image src="/assets/wallpaper.png" alt="Wallpaper" fill className="object-cover" priority />
      </div>
    </div>
  );
}
