import Card from '@/components/portfolio/card';
import Footer from '@/components/footer';

import type { Metadata } from 'next';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: "portfolio — linkai wu",
  description: "my work in development, design, and more. i'm a developer, designer, and student fascinated with the intersection of tech, art, and people.",
};

interface Project {
  title: string;
  tagline: string;
  tags?: string[];
  description?: string;
  thumbnail: string;
  url?: string;
  wide?: boolean;
}

const projects: Project[] = [
  {
    title: 'Wisconsin Robotics',
    tagline: 'Website & outreach',
    tags: ['dev', 'web', 'ux', 'electrical'],
    description: 'The website for UW-Madison\'s competitive robotics team. I also did CAD and electrical design for a few outreach projects!',
    thumbnail: '/assets/portfolio/wisconsinrobotics.png',
    url: 'https://wisconsinrobotics.org',
    wide: true,
  },
  {
    title: 'STEM to the Sky',
    tagline: 'Website & CMS',
    tags: ['dev', 'web', 'ux'],
    description: 'The website for a nonprofit that promotes STEM careers to students.',
    thumbnail: '/assets/portfolio/stemtothesky.png',
    url: 'https://stemtothesky.org',
  },
  {
    title: 'IUFRO Tree Biotech',
    tagline: 'Website & CMS',
    tags: ['dev', 'web', 'ux'],
    description: 'The website for an international conference by organizers at the University of Maryland.',
    thumbnail: '/assets/portfolio/iufro.png',
    url: 'https://treebiotech.org',
  },
  {
    title: 'Oracle of Blair',
    tagline: 'Website & predictive model',
    tags: ['data', 'dev', 'web', 'ux'],
    description: 'Web and graphic design for our senior class model of the 2022 US elections.',
    thumbnail: '/assets/portfolio/oracleofblair.png',
    url: 'https://polistat-site-2022.vercel.app/',
  },
  {
    title: 'Boba Barista',
    tagline: '3D modeling',
    tags: ['3d', 'maya'],
    description: 'A character I designed for a 3D art project incorporating a few of my favorite things!',
    thumbnail: '/assets/portfolio/redpandabobabarista.png',
    wide: true,
  },
  {
    title: '3D Club Village',
    tagline: 'Collaborative workshop',
    tags: ['3d', 'spline'],
    description: 'An intro 3D-modeling workshop I wrote for Hack Club. Check it out!',
    thumbnail: '/assets/portfolio/3dworkshop.png',
    url: 'https://jams.hackclub.com/jam/3d-club-village',
  },
  {
    title: '\"Housewarming\"',
    tagline: '3D modeling',
    tags: ['3d', 'maya'],
    thumbnail: '/assets/portfolio/vanitas.jpg',
  },
  {
    title: '\"The Boys Crossing the Delaware\"',
    tagline: 'Photoshop',
    tags: ['2d', 'photoshop'],
    thumbnail: '/assets/portfolio/fortnitedelaware.jpg',
    wide: true,
  },
  {
    title: '\"Vintage Dino\"',
    tagline: 'Photoshop',
    tags: ['2d', 'photoshop'],
    thumbnail: '/assets/portfolio/vintagedino.jpg',
  },
  {
    title: 'Wordle Archive',
    tagline: 'Word game clone',
    tags: ['dev', 'web'],
    description: 'Ranked #3 on Google for "wordle archive"!',
    thumbnail: '/assets/portfolio/wordlearchive.png',
    url: 'https://wordle.linkaiwu.com',
  },
  {
    title: 'Bongo Cat',
    tagline: 'Instrument simulator',
    tags: ['dev', 'web'],
    thumbnail: '/assets/portfolio/bongocat.png',
    url: 'https://bongocat.linkaiwu.com',
  },
  {
    title: 'Among Us 3D',
    tagline: 'ඞ',
    tags: ['dev', 'game', 'unity'],
    description: 'A lil experiment in Unity from a long time ago :)',
    thumbnail: '/assets/portfolio/amongus3d2.png',
    url: 'https://github.com/linkai101/Among-Us-3D/releases',
    wide: true,
  },
];

export default function PortfolioPage() {
  return <>
    <div className="container max-w-7xl px-4 py-16">
      <div className="flex justify-center">
        <h1 className="flex flex-col text-[5rem] md:text-9xl leading-[4rem] md:leading-[5.5rem] font-heading font-bold lowercase">
          <span className="md:-ml-12 text-5xl md:text-6xl font-bold font-cursive">
            Linkai&apos;s
          </span>{" "}
          Portfolio
        </h1>
      </div>
    </div>

    <div className="px-6 pt-6 pb-20 container max-w-7xl grid grid-cols-1 md:grid-cols-7 grid-flow-row-dense gap-6">
      {projects.map((project, i) =>
        <div
          className={cn(project.wide ? 'md:col-span-3 max-w-full' : 'md:col-span-2 md:aspect-auto', "relative md:min-h-64 aspect-video")}
          key={project.title}
        >
          {i === 0 && (
            <div className="absolute bottom-[calc(100%+1rem)] left-0 z-20">
              <Arrow className="w-12 rotate-180 fill-primary/50"/>
              <p className="absolute top-6 left-[calc(100%-0.5rem)] text-primary/50 font-mono font-bold uppercase whitespace-nowrap">
                Hover/tap me!
              </p>
            </div>
          )}

          <Card
            className="size-full"
            project={project}
          />
        </div>
      )}
    </div>

    <Footer/>
  </>;
}

function Arrow({ ...rest }: { [key: string]: any }) {
  return (
    <svg
      fill="black"
      xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 352.2 352.2"
      {...rest}
    >
      <g>
        <path d="M348.232,100.282c-13.464-32.436-35.496-60.588-45.9-94.86c-1.836-5.508-11.016-7.956-13.464-1.836
          c-14.688,34.272-36.72,65.484-47.124,101.592c-1.836,6.732,7.344,13.464,12.24,7.344c7.344-9.18,15.912-16.524,24.479-25.092
          c-1.224,52.632,0,105.264-9.18,157.284c-4.896,28.152-11.628,59.977-31.824,81.396c-24.479,25.704-55.08,2.448-68.544-21.42
          c-11.628-20.809-31.823-110.772-72.215-79.561c-23.868,18.36-29.988,43.452-37.332,70.992c-1.836,7.956-4.896,15.3-8.568,22.032
          c-14.076,26.316-32.436-16.524-33.048-26.928c-1.224-20.809,4.896-42.229,9.792-62.424c1.836-6.12-7.344-8.568-9.792-2.448
          c-11.016,28.764-26.316,77.724,0,102.815c23.256,21.42,42.84,7.345,52.02-17.748c6.12-16.523,29.376-108.323,56.304-65.483
          c17.748,28.151,22.644,61.812,44.064,88.128c15.3,18.359,42.84,22.644,64.26,13.464c25.704-11.628,36.72-45.9,43.452-70.38
          c16.523-61.2,16.523-127.296,14.688-190.332c14.688,9.792,31.212,18.972,47.736,25.092
          C347.008,113.746,350.681,105.178,348.232,100.282z M268.672,78.25c7.956-17.136,17.748-34.272,26.316-51.408
          c9.18,21.42,20.808,40.392,31.824,61.2c-12.853-7.956-25.092-17.136-39.168-18.972c-3.061-0.612-5.509,1.224-6.732,3.672
          C276.628,73.354,272.345,75.19,268.672,78.25z"/>
      </g>
    </svg>
  );
}