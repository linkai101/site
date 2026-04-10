import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-10 mb-4 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-3 text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-7 text-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-1 text-foreground">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1 text-foreground">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-primary pl-4 text-muted italic">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
      >
        {children}
      </Link>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm bg-foreground/10 rounded px-1 py-0.5">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-foreground/10 p-4 font-mono text-sm">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-8 border-foreground/20" />,
    img: (props) => <img {...props} className="w-full rounded-lg my-4" />,
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="border-b border-foreground/20">{children}</thead>,
    tr: ({ children }) => <tr className="border-b border-foreground/10">{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-2 text-left font-semibold text-foreground">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-foreground">{children}</td>
    ),

    ...components,
  };
}
