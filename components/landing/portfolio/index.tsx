import { PortfolioCard } from "./card";

const experiences = [
  { year: "2026", company: "Zoox", role: "Software Engineer Intern" },
  { year: "2025", company: "Amazon", role: "Software Development Engineer Intern" },
  { year: "2024", company: "Hansoh Bio", role: "Software Engineer Intern" },
  { year: "2022", company: "NASA", role: "Research Intern" },
];

const projects = [
  {
    src: "/assets/thumbnails/resolution.png",
    alt: "A preview of the Resolution web app",
    title: "An interactive art gallery",
    label: "Resolution (2026)",
    url: "https://resolution.linkai.dev",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/nyustartupweek26.png",
    alt: "A preview of NYU Startup Week 2026's website design",
    title: "A week of entrepreneurial inspiration",
    label: "NYU Startup Week (2025-26)",
    url: "https://nyusw.com",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/nyutransitapp.png",
    alt: "Logo and mockups of the NYU Transit app concept",
    title: "University shuttle transit app",
    label: "Concept (2025)",
    url: "/2025-nyu-transit-app",
  },
  {
    src: "/assets/thumbnails/bobabarista.png",
    alt: "Front and side view of a 3D boba barista character",
    title: "3D boba barista",
    label: "Concept (2024)",
    url: "/2024-boba-barista",
  },
  {
    src: "/assets/thumbnails/miscartprojects.png",
    alt: "A showcase of miscellaneous art projects",
    title: "Miscellaneous art projects",
    label: "Collection (2023-24)",
    url: "/2023-misc-art-projects",
  },
  {
    src: "/assets/thumbnails/stemtothesky.png",
    alt: "STEM to the Sky's website landing page",
    title: "Showcasing careers in STEM",
    label: "STEM to the Sky (2023)",
    url: "https://stemtothesky.org",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/wordlearchive.png",
    alt: "A screenshot of the Wordle Archive website",
    title: "Wordle game clone",
    label: "Wordle Archive (2023)",
    url: "https://wordle.linkaiwu.com",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/oracleofblair.png",
    alt: "A thumbnail with graphics shown on Oracle of Blair's website",
    title: "U.S. elections forecast",
    label: "Oracle of Blair (2022)",
    url: "https://polistat-site-2022.vercel.app",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/bongocat.png",
    alt: "A thumbnail with bongo cat and a keyboard",
    title: "Virtual instrument playground",
    label: "Bongo Cat (2022)",
    url: "https://bongocat.linkai.dev",
    urlIsExternal: true,
  },
];

export function PortfolioSection() {
  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 === 1);

  return (
    <div className="container max-w-[104rem] px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <h2 className="sr-only">Portfolio</h2>

      <div className="flex items-end lg:h-32">
        <p className="text-3xl lg:text-4xl font-semibold">
          {"I'm Linkai, a student, software engineer, and designer."}
        </p>
      </div>

      <div className="flex items-end lg:h-32">
        <table className="w-full">
          <tbody className="">
            {experiences.map(({ year, company, role }) => (
              <tr key={year + company}>
                <td className="text-muted pr-4 py-1.5 sm:py-0.5">{year}</td>
                <td className="pr-4 py-1.5 sm:py-0.5">
                  {company}
                  <p className="block sm:hidden text-sm text-muted leading-none">{role}</p>
                </td>
                <td className="hidden sm:table-cell text-muted py-1.5 sm:py-0.5">{role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: all projects in order */}
      <div className="lg:hidden flex flex-col gap-8">
        {projects.map((project) => (
          <PortfolioCard key={project.label} {...project} />
        ))}
      </div>

      {/* Desktop: two staggered columns */}
      <div className="hidden lg:flex flex-col gap-8">
        {leftProjects.map((project) => (
          <PortfolioCard key={project.label} {...project} />
        ))}
      </div>

      <div className="hidden lg:flex flex-col gap-8">
        {rightProjects.map((project) => (
          <PortfolioCard key={project.label} {...project} />
        ))}
      </div>
    </div>
  );
}
