import Link from 'next/link';

import Card from '@/components/home/portfolio-card';

export interface PortfolioProject {
  title: string;
  tagline: string;
  description?: string;
  thumbnail: string;
  url?: string;
  urlIsExternal?: boolean;
}

const experience: PortfolioProject[] = [
  {
    title: 'Hansoh Pharma',
    tagline: 'Chemical toxicity prediction',
    thumbnail: '/assets/thumbnails/hansoh-bio.png',
    url: '/hansoh-bio',
  },
  {
    title: 'NASA',
    tagline: 'Climate research',
    thumbnail: '/assets/thumbnails/nasa.png',
    url: '/nasa',
  },
];

const projects: PortfolioProject[] = [
  {
    title: 'Young-adult cooking app',
    tagline: 'UX case study',
    thumbnail: '/assets/thumbnails/young-adult-cooking-app.png',
    url: '/young-adult-cooking-app',
  },
  {
    title: 'STEM to the Sky',
    tagline: 'Website design',
    thumbnail: '/assets/thumbnails/stemtothesky.png',
    url: 'https://stemtothesky.org',
    urlIsExternal: true,
  },
  {
    title: 'Oracle of Blair',
    tagline: '2022 U.S. elections forecast',
    thumbnail: '/assets/thumbnails/oracleofblair.png',
    url: 'https://polistat-site-2022.vercel.app',
    urlIsExternal: true,
  },
];

const experiments: PortfolioProject[] = [
  {
    title: 'Football graphic',
    tagline: 'Animated web component',
    thumbnail: '/assets/thumbnails/football.png',
    url: 'https://football.linkai.dev',
    urlIsExternal: true,
  },
  {
    title: 'Boba Barista',
    tagline: '3D character modeling',
    thumbnail: '/assets/thumbnails/boba-barista.png',
    url: '/boba-barista',
  },
  {
    title: 'Bongo Cat',
    tagline: 'Instrument simulator',
    thumbnail: '/assets/thumbnails/bongocat.png',
    url: 'https://bongocat.linkai.dev',
    urlIsExternal: true,
  },
  {
    title: 'Wordle Archive',
    tagline: 'Word game clone',
    thumbnail: '/assets/thumbnails/wordlearchive.png',
    url: 'https://wordle.linkaiwu.com',
    urlIsExternal: true,
  },
];

export default function Portfolio() {
  return (
    <div className="px-4 pt-16 pb-20 container max-w-8xl grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
      <div className="relative">
        <section className="sticky top-16">
          <h2 className="text-center text-lg text-dark/25 font-mono font-medium uppercase italic">
            Work
          </h2>
          <div className="mt-4 flex flex-col gap-8">
            {experience.map((project, i) => (
              project.url ?
                <Link
                  href={project.url}
                  target={project.urlIsExternal ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  key={i}
                >
                  <Card
                    project={project}
                  />
                </Link>
              :
                <Card
                  key={i}
                  project={project}
                />
            ))}
          </div>
        </section>
      </div>

      <hr className="block lg:hidden border-primary/25 border-1.5"/>

      <div className="relative">
        <section className="sticky top-16">
          <h2 className="text-center text-lg text-dark/25 font-mono font-medium uppercase italic">
            Projects
          </h2>

          <div className="mt-4 flex flex-col gap-8">
            {projects.map((project, i) => (
              project.url ?
                <Link
                  href={project.url}
                  target={project.urlIsExternal ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  key={i}
                >
                  <Card
                    project={project}
                  />
                </Link>
              :
                <Card
                  key={i}
                  project={project}
                />
            ))}
          </div>
        </section>
      </div>

      <hr className="block lg:hidden border-primary/25 border-1.5"/>

      <div className="relative">
        <section className="sticky top-16">
          <h2 className="text-center text-lg text-dark/25 font-mono font-medium uppercase italic">
            Experiments
          </h2>

          <div className="mt-4 flex flex-col gap-8">
            {experiments.map((project, i) => (
              project.url ?
                <Link
                  href={project.url}
                  target={project.urlIsExternal ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  key={i}
                >
                  <Card
                    project={project}
                  />
                </Link>
              :
                <Card
                  key={i}
                  project={project}
                />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}