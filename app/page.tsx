
import Hero from './Hero';

export default function Home() {
  return <>
    <Hero/>

    <div className="min-h-dvh pt-24 pb-12 px-2">
      <h2 className="container max-w-3xl text-6xl text-center font-heading">
        The <span className="text-primary font-cursive">intersection</span> of tech, art, and people is where I like to be.
      </h2>
    </div>
  </>;
}