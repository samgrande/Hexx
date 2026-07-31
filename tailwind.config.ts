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
        // "display" = Bodoni Moda (editorial serif for headlines)
        display: ["var(--font-triodion)", "Georgia", "serif"],
        // "body" = Plus Jakarta Sans (clean geometric sans for copy & labels)
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        // "label" kept as an alias for body for backwards compat
        label: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "420px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        // brand tracking for display headings
        display: "-0.015em",
      },
    },
  },
  plugins: [],
};

export default config;
