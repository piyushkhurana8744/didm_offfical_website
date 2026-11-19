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
          red: "#b52828",
          "red-vibrant": "#f0081e",
          "red-ink": "#8e1f1f",
          "red-soft": "#fdf2f2",
          "red-dark": "#991b1b",
        },
        ai: {
          DEFAULT: "#b52828",
          ink: "#8e1f1f",
          soft: "#fdf2f2",
          dark: "#dc2626",
          "soft-dark": "#1f1f23",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          2: "#F8F9FA",
          dark: "#131319",
          "2-dark": "#1A1A22",
        },
        ink: {
          DEFAULT: "#222222",
          2: "#333333",
          muted: "#666666",
        },
        line: {
          DEFAULT: "#E5E5E5",
          2: "#D4D4D4",
          dark: "#26262F",
          "2-dark": "#34343F",
        },
      },
      fontFamily: {
        heading: ["Poppins", "system-ui", "sans-serif"],
        body: ["Open Sans", "system-ui", "sans-serif"],
        accent: ["Raleway", "system-ui", "sans-serif"],
        sans: ["Open Sans", "Poppins", "system-ui", "sans-serif"],
        serif: ["Poppins", "Georgia", "serif"],
        mono: ["monospace"],
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

