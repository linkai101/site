import Card from '@/components/portfolio/card';
import Footer from '@/components/footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "portfolio — linkai wu",
  description: "My work in development, design, and more. I'm a developer, designer, and student fascinated with the intersection of tech, art, and people.",
};

interface Project {
  title: string;
  tagline: string;
  description?: string;
  thumbnail: string;
  url?: string;
}

const experience: Project[] = [
  // {
  //   title: 'Chemicals + toxicity prediction',
  //   tagline: 'Projects at Hansoh Bio',
  //   description: '',
  //   thumbnail: null,
  // },
  {
    title: 'IUFRO Tree Biotech 2024',
    tagline: 'Conference website',
    description: 'The website for an international conference by organizers at the University of Maryland.',
    thumbnail: '/assets/portfolio/iufro.png',
    url: 'https://treebiotech.org',
  },
  // {
  //   title: 'Analyzing atmospheric gravity waves',
  //   tagline: 'Project at NASA',
  //   description: '',
  //   thumbnail: null,
  // },
];

const projects: Project[] = [
  // {
  //   title: 'Young-adult cooking app',
  //   tagline: 'UX case study',
  //   description: '',
  //   thumbnail: null,
  // },
  {
    title: 'Hack Club Jams',
    tagline: 'Frontend development',
    description: '',
    thumbnail: '/assets/portfolio/jams.png',
    url: 'https://jams.hackclub.com',
  },
  {
    title: 'STEM to the Sky',
    tagline: 'Website design',
    description: 'The website for a nonprofit that promotes STEM careers to students.',
    thumbnail: '/assets/portfolio/stemtothesky.png',
    url: 'https://stemtothesky.org',
  },
  {
    title: 'Oracle of Blair',
    tagline: '2022 U.S. elections forecast',
    description: 'Web and graphic design for our senior class model of the 2022 U.S. elections.',
    thumbnail: '/assets/portfolio/oracleofblair.png',
    url: 'https://polistat-site-2022.vercel.app',
  },
];

const experiments: Project[] = [
  {
    title: 'Football graphic',
    tagline: 'Animated web component',
    description: 'An animated football field graphic based from the Apple Sports app.',
    thumbnail: '/assets/portfolio/football.png',
    url: 'https://football.linkai.dev',
  },
  {
    title: 'Boba Barista',
    tagline: '3D character modeling',
    description: 'A character I designed for a 3D art project incorporating a few of my favorite things!',
    thumbnail: '/assets/portfolio/redpandabobabarista.png',
  },
  {
    title: 'Bongo Cat',
    tagline: 'Instrument simulator',
    thumbnail: '/assets/portfolio/bongocat.png',
    url: 'https://bongocat.linkai.dev',
  },
  {
    title: 'Wordle Archive',
    tagline: 'Word game clone',
    description: 'On the first page of Google for "wordle archive"!',
    thumbnail: '/assets/portfolio/wordlearchive.png',
    url: 'https://wordle.linkaiwu.com',
  },
  {
    title: 'Among Us 3D',
    tagline: 'Unity experiment',
    description: '',
    thumbnail: '/assets/portfolio/amongus3d.png',
    url: 'https://github.com/linkai101/Among-Us-3D/releases',
  },
];

export default function PortfolioPage() {
  return <>
    <div className="container max-w-7xl px-4 pt-20 pb-16">
      <div className="flex justify-center">
        <h1 className="flex flex-col text-[5rem] md:text-9xl leading-[4rem] md:leading-[5.5rem] font-heading font-bold lowercase">
          <span className="md:-ml-12 text-5xl md:text-6xl font-bold font-cursive">
            Linkai&apos;s
          </span>{" "}
          Portfolio
        </h1>
      </div>
    </div>

    <div className="px-4 pt-4 pb-20 container-max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8">
      <section>
        <h2 className="text-center text-lg text-dark/25 font-mono font-medium uppercase italic">
          Experience
        </h2>
        <div className="mt-4 flex flex-col gap-12">
          {experience.map((project, i) => (
            <Card
              key={i}
              project={project}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-center text-lg text-dark/25 font-mono font-medium uppercase italic">
          Projects
        </h2>

        <div className="mt-4 flex flex-col gap-12">
          {projects.map((project, i) => (
            <Card
              key={i}
              project={project}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-center text-lg text-dark/25 font-mono font-medium uppercase italic">
          Experiments
        </h2>

        <div className="mt-4 flex flex-col gap-12">
          {experiments.map((project, i) => (
            <Card
              key={i}
              project={project}
            />
          ))}
        </div>
      </section>
    </div>

    <Footer/>
  </>;
}