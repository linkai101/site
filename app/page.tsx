import { isMobile } from "@/lib/is-mobile";
import { DesktopHeroSection } from "@/components/landing/hero";
import { MobileHeroSection } from "@/components/landing/hero-mobile";
import { PortfolioSection } from "@/components/landing/portfolio";

export default async function Home() {
  const mobile = await isMobile();

  return (
    <div>
      {mobile ? <>
        <MobileHeroSection />
      </> : <>
        <div className="md:hidden">
          <MobileHeroSection />
        </div>
        <div className="hidden md:block">
          <DesktopHeroSection />
        </div>
      </>}
      <PortfolioSection/>
    </div>
  );
}
