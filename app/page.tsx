import { HeroSection } from "@/components/landing/hero";
import { PortfolioSection } from "@/components/landing/portfolio";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <PortfolioSection/>
      <Footer/>
    </div>
  );
}
