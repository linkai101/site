import type { Config } from "tailwindcss";

export default {
  darkMode: 'selector',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Epilogue", "sans-serif"],
        heading: ["Koulen", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
        cursive: ["Pinyon Script", "cursive"],
        sketch: ["Londrina Solid", "sans-serif"],
        sketchOutline: ["Londrina Sketch", "sans-serif"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      colors: {
        primary: "#C7956D",
        light: "#FCF5ED",
        dark: "#1F1717",
      },
      typography: ({ theme }: { theme: any }) => ({
        theme: {
          css: {
            p: {
              '&::before': {
                content: 'none !important',
              },
              '&::after': {
                content: 'none !important',
              },
            },
            '--tw-prose-body': theme('colors.dark'),
            '--tw-prose-headings': theme('colors.dark'),
            '--tw-prose-lead': theme('colors.dark'),
            '--tw-prose-links': theme('colors.dark'),
            '--tw-prose-bold': theme('colors.dark'),
            '--tw-prose-counters': theme('colors.dark'),
            '--tw-prose-bullets': theme('colors.dark'),
            '--tw-prose-hr': theme('colors.dark'),
            '--tw-prose-quotes': theme('colors.dark'),
            '--tw-prose-quote-borders': theme('colors.dark'),
            '--tw-prose-captions': theme('colors.dark'),
            '--tw-prose-code': theme('colors.dark'),
            '--tw-prose-pre-code': theme('colors.dark'),
            '--tw-prose-pre-bg': theme('colors.dark'),
            '--tw-prose-th-borders': theme('colors.dark'),
            '--tw-prose-td-borders': theme('colors.dark'),
            '--tw-prose-invert-body': theme('colors.dark'),
            '--tw-prose-invert-headings': theme('colors.light'),
            '--tw-prose-invert-lead': theme('colors.dark'),
            '--tw-prose-invert-links': theme('colors.light'),
            '--tw-prose-invert-bold': theme('colors.light'),
            '--tw-prose-invert-counters': theme('colors.dark'),
            '--tw-prose-invert-bullets': theme('colors.dark'),
            '--tw-prose-invert-hr': theme('colors.dark'),
            '--tw-prose-invert-quotes': theme('colors.dark'),
            '--tw-prose-invert-quote-borders': theme('colors.dark'),
            '--tw-prose-invert-captions': theme('colors.dark'),
            '--tw-prose-invert-code': theme('colors.light'),
            '--tw-prose-invert-pre-code': theme('colors.dark'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.dark'),
            '--tw-prose-invert-td-borders': theme('colors.dark'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;