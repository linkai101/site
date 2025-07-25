import Hero from '@/components/home/hero';
import HeroMobile from '@/components/home/hero-mobile';
import Portfolio from '@/components/home/portfolio';
import Footer from '@/components/footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "i'm linkai wu",
  description: "a developer, designer, and student fascinated with the intersection of tech, art, and people.",
};

export default function HomePage() {
  return <>
    <Hero className="hidden md:block"/>
    <HeroMobile className="block md:hidden"/>

    <Portfolio/>

    <Footer/>
  </>;
}