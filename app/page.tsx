import Hero from '@/components/home/hero';
import HeroMobile from '@/components/home/hero-mobile';
import SelectedWorks from '@/components/home/selected-works';
import Footer from '@/components/footer';

export default function Home() {
  return <>
    <Hero className="hidden md:block"/>
    <HeroMobile className="block md:hidden"/>

    <SelectedWorks/>

    <Footer/>
  </>;
}