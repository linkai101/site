import { headers } from "next/headers";
import { DesktopHeroSection } from "@/components/landing/hero";
import { MobileHeroSection } from "@/components/landing/hero-mobile";
import { PortfolioSection } from "@/components/landing/portfolio";

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  return (
    <div>
      {isMobile ? <MobileHeroSection /> : <DesktopHeroSection />}
      <PortfolioSection/>
    </div>
  );
}
