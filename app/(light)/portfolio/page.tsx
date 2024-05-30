import Card from '@/components/portfolio/card';
import Footer from '@/components/home/footer';

import type { Metadata } from 'next';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: "portfolio — linkai wu",
  description: "",
};

const projects = [
  {
    title: 'Wisconsin Robotics',
    description: 'Website & outreach',
    tags: ['dev', 'ux', 'electrical'],
    thumbnail: '/assets/portfolio/wisconsinrobotics.png',
    wide: true,
  },
  {
    title: 'STEM to the Sky',
    description: 'Website & CMS',
    tags: ['dev', 'ux'],
    thumbnail: '/assets/portfolio/stemtothesky.png',
  },
  {
    title: 'IUFRO Tree Biotech',
    description: 'Website & CMS',
    tags: ['dev', 'ux'],
    thumbnail: '/assets/portfolio/iufro.png',
  },
  {
    title: 'Oracle of Blair',
    description: 'Website & predictive model',
    tags: ['data', 'dev', 'ux'],
    thumbnail: '/assets/portfolio/oracleofblair.png',
  },
  {
    title: 'Boba Barista',
    description: '3D character design',
    tags: ['3d'],
    thumbnail: '/assets/portfolio/redpandabobabarista.png',
    wide: true,
  },
  {
    title: '3D Club Village',
    description: 'Collaborative workshop',
    tag: '[3D]',
    tags: ['3d'],
    thumbnail: '/assets/portfolio/3dworkshop.png',
  },
  {
    title: '\"Housewarming\"',
    description: '3D still life',
    tags: ['3d'],
    thumbnail: '/assets/portfolio/vanitas.jpg',
  },
  {
    title: '\"The Boys Crossing the Delaware\"',
    description: 'Photoshop',
    tags: ['2d'],
    thumbnail: '/assets/portfolio/fortnitedelaware.jpg',
    wide: true,
  },
  {
    title: '\"Vintage Dino\"',
    description: 'Photoshop',
    tags: ['2d'],
    thumbnail: '/assets/portfolio/vintagedino.jpg',
  },
  {
    title: '\"Area 51\"',
    description: 'Photoshop',
    tags: ['2d'],
    thumbnail: '/assets/portfolio/area51.jpg',
  },
];

export default function PortfolioPage() {
  return <>
    <div className="container max-w-7xl px-4 py-16">
      <div className="flex justify-center">
        <h1 className="flex flex-col text-8xl md:text-9xl leading-[4rem] md:leading-[5.5rem] font-heading font-bold lowercase">
          <span className="md:-ml-12 text-5xl md:text-6xl font-bold font-cursive">
            Linkai&apos;s
          </span>{" "}
          Portfolio
        </h1>
      </div>
    </div>

    <div className="px-6 pt-6 pb-20 container max-w-7xl grid grid-cols-1 md:grid-cols-7 grid-flow-row-dense gap-6">
      {projects.map((project, i) => (
        <Card
          key={project.title}
          className={cn(project.wide ? 'md:col-span-3 max-w-full' : 'md:col-span-2 md:aspect-auto', "md:min-h-64 aspect-video")}
          project={project}
        />
      ))}
    </div>

    <Footer/>
  </>;
}
