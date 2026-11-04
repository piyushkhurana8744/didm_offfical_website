import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C8102E",
          "red-ink": "#A50D26",
          "red-soft": "#FBEAEC",
          "red-dark": "#FF5C72",
        },
        ai: {
          DEFAULT: "#4F46E5",
          ink: "#4338CA",
          soft: "#EEF0FF",
          dark: "#A5B4FC",
          "soft-dark": "#1B1C35",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          2: "#F3F1EC",
          dark: "#131319",
          "2-dark": "#1A1A22",
        },
        ink: {
          DEFAULT: "#0E0E12",
          2: "#2B2B33",
          muted: "#5A5A66",
        },
        line: {
          DEFAULT: "#E6E3DC",
          2: "#D6D2C8",
          dark: "#26262F",
          "2-dark": "#34343F",
        },
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "14px",
        sm: "10px",
        advisor: "20px",
        cta: "24px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 12px 30px -10px rgba(200, 16, 46, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)",
        advisor: "0 20px 40px -15px rgba(79, 70, 229, 0.15), 0 0 1px 1px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
