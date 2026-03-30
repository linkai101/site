import Link from "next/link";

const projects = [
  {
    src: "/assets/thumbnails/nyustartupweek26.png",
    alt: "NYU Startup Week",
    title: "A week of entrepreneurial inspiration",
    label: "NYU Startup Week (2026)",
    url: "https://nyusw.com",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/nyutransitapp.png",
    alt: "University shuttle transit app",
    title: "University shuttle transit app",
    label: "Concept (2025)",
    url: "/2025-nyu-transit-app",
  },
  {
    src: "/assets/thumbnails/bobabarista.png",
    alt: "3D boba barista",
    title: "3D boba barista",
    label: "Concept (2024)",
    url: "/2024-boba-barista",
  },
  {
    src: "/assets/thumbnails/stemtothesky.png",
    alt: "STEM to the Sky",
    title: "Showcasing careers in STEM",
    label: "STEM to the Sky (2023)",
    url: "https://stemtothesky.org",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/wordlearchive.png",
    alt: "Wordle Archive",
    title: "Wordle game clone",
    label: "Wordle Archive (2023)",
    url: "https://wordle.linkaiwu.com",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/oracleofblair.png",
    alt: "Oracle of Blair",
    title: "U.S. elections forecast",
    label: "Oracle of Blair (2022)",
    url: "https://polistat-site-2022.vercel.app",
    urlIsExternal: true,
  },
  {
    src: "/assets/thumbnails/bongocat.png",
    alt: "Bongo Cat",
    title: "Virtual instrument playground",
    label: "Bongo Cat (2022)",
    url: "https://bongocat.linkai.dev",
    urlIsExternal: true,
  },
];

const experiences = [
  // { year: "2026", company: "Zoox", role: "Software Engineer Intern" },
  { year: "2025", company: "Amazon", role: "Software Development Engineer Intern" },
  { year: "2024", company: "Hansoh Bio", role: "Software Engineer Intern" },
  { year: "2022", company: "NASA", role: "Research Intern" },
];

function PortfolioCard({ src, alt, title, label, url, urlIsExternal }: (typeof projects)[number]) {
  const content = (
    <>
      <div className="relative overflow-hidden transition-shadow duration-300 [box-shadow:inset_0_0_20px_rgba(0,0,0,0)] group-hover:[box-shadow:inset_0_0_20px_rgba(0,0,0,0.18)]">
        <img
          src={src}
          alt={alt}
          className="w-full transition-opacity duration-300 group-hover:opacity-80"
        />
      </div>

      <div className="mt-2 flex justify-between items-center gap-4">
        <h3 className="text-lg font-medium transition-[font-weight] duration-300 group-hover:font-semibold">{title}</h3>
        <p className="text-sm font-mono text-muted uppercase transition-[font-weight] duration-300 group-hover:font-medium">{label}</p>
      </div>
    </>
  );

  if (url) {
    return (
      <Link
        href={url}
        className="group block"
        {...(urlIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </Link>
    );
  }

  return <div className="group">{content}</div>;
}

export function PortfolioSection() {
  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 === 1);

  return (
    <div className="container max-w-[104rem] px-6 py-8 grid grid-cols-2 gap-8 items-start">
      <h2 className="sr-only">Portfolio</h2>

      <div className="flex items-end h-32">
        <p className="text-4xl font-semibold">
          {"I'm Linkai, a student, software engineer, and designer."}
        </p>
      </div>

      <div className="flex items-end h-32">
        <table className="w-full">
          <tbody className="leading-relaxed">
            {experiences.map(({ year, company, role }) => (
              <tr key={year + company}>
                <td className="text-muted">{year}</td>
                <td>{company}</td>
                <td className="text-muted">{role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-8">
        {leftProjects.map((project) => (
          <PortfolioCard key={project.label} {...project} />
        ))}
      </div>

      <div className="flex flex-col gap-8">
        {rightProjects.map((project) => (
          <PortfolioCard key={project.label} {...project} />
        ))}
      </div>
    </div>
  );
}
