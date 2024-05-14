import Hero from './Hero';
import HeroMobile from './HeroMobile';
import SelectedWorks from './SelectedWorks';

export default function Home() {
  return <>
    <Hero className="hidden md:block"/>
    <HeroMobile className="block md:hidden"/>

    <SelectedWorks/>
  </>;
}