import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#040404",
        paper: "#ffffff",
        pill: "rgba(217,217,217,0.07)",
      },
      fontFamily: {
        // "display" maps to whatever font sets --font-triodion in
        // src/app/layout.tsx. It's currently Bodoni Moda (Google Fonts)
        // standing in for the Figma file's licensed "Triodion" face —
        // swap the next/font import there once you have the real files.
        display: ["var(--font-triodion)", "Georgia", "serif"],
        body: ["var(--font-roboto-condensed)", "sans-serif"],
        label: ["var(--font-roboto)", "sans-serif"],
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
