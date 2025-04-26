import type { MDXComponents } from 'mdx/types';
import "@/components/github-dark-dimmed.css"; // theme for rehype-highlight

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}