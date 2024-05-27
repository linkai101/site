import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "portfolio — linkai wu",
  description: "",
};

export default function PortfolioPage() {
  return <>
    {/* <div className="container max-w-7xl px-4 py-16">
      <div className="flex justify-center">
        <h1 className="relative text-9xl text-center font-heading font-bold uppercase">
          <span className="absolute -top-10 -left-12 text-6xl font-bold font-cursive lowercase">
            Linkai&apos;s
          </span>{" "}
          Portfolio
        </h1>
      </div>
    </div> */}
    <div className="container max-w-7xl px-4 py-16">
      <div className="flex justify-center">
        <h1 className="flex flex-col text-9xl leading-[5.5rem] font-heading font-bold lowercase">
          <span className="-ml-12 text-6xl font-bold font-cursive">
            Linkai&apos;s
          </span>{" "}
          Portfolio
        </h1>
      </div>
    </div>
  </>;
}
