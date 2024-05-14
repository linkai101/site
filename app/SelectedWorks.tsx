import ContrastLink from '@/components/ui/contrast-link';

import { cn } from '@/utils/cn';

const featured = [
  {
    title: 'Project 1',
    description: 'Description',
    tag: '[TAG]',
    thumbnail: '',
  },
  {
    title: 'Project 2',
    description: 'Description',
    tag: '[TAG]',
    thumbnail: '',
  },
  {
    title: 'Project 3',
    description: 'Description',
    tag: '[TAG]',
    thumbnail: '',
  },
  {
    title: 'Project 4',
    description: 'Description',
    tag: '[TAG]',
    thumbnail: '',
  },
];

export default function SelectedWorks({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <div className={cn("pt-24 pb-36 px-2 relative", className)} {...rest}>
      <h2 className="container max-w-3xl text-6xl text-center font-heading">
        The <span className="text-primary font-cursive">intersection</span> of tech, art, and people is where I like to be.
      </h2>

      <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-x-36 lg:gap-x-48 gap-y-24 md:gap-y-12 mt-32">
        {featured.map((project, i) => <>
          {i%2==0 && <div className="hidden md:block h-24"/>} {/* SPACER */}

          <div className="row-span-2">
            <div className="aspect-video bg-light/20 rounded-lg"/> {/* THUMBNAIL */}

            <div className={cn("flex gap-8 justify-between mt-1", i%2==1 && "md:flex-row-reverse")}>
              <div className="md:-ml-10 -mt-6">
                <h3 className="text-3xl text-primary font-mono font-bold uppercase">
                  {project.title}
                </h3>
                <p className="text-primary/50 leading-6 font-mono uppercase">
                  {project.description}
                </p>
              </div>

              <p className="text-lg text-primary leading-6 font-mono uppercase">
                {project.tag}
              </p>
            </div>
          </div>

          {i%2==1 && <div className="hidden md:block h-24"/>} {/* SPACER */}
        </>)}
        
        <div className="hidden md:block h-48"/> {/* SPACER */}

        <div className="md:-ml-10">
          <p className="container max-w-xs text-lg leading-6 text-center font-mono uppercase">
            Designing, developing, and learning for meaningful impact.
          </p>

          {/* <p className="text-5xl text-center font-heading uppercase underline decoration-2 underline-offset-4 mt-8">
            View my projects
          </p> */}
          <p className="text-center mt-8">
            <ContrastLink href="/portfolio" className="text-5xl font-heading uppercase">
              View my portfolio
            </ContrastLink>
          </p>
        </div>
      </div>
    </div>
  );
}
