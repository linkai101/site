import Hero from '@/components/home/hero';
import HeroMobile from '@/components/home/hero-mobile';
import SelectedWorks from '@/components/home/selected-works';
import Footer from '@/components/home/footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "i'm linkai wu",
  description: "",
};

export default function HomePage() {
  return <>
    <Hero className="hidden md:block"/>
    <HeroMobile className="block md:hidden"/>

    <SelectedWorks/>

    <Footer/>
  </>;
}