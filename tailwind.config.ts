import type { Config } from "tailwindcss";
import { glassPlugin } from "./src/theme/plugins/glass";

export default {
  darkMode: ["class"], // Adds dark mode support
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))", // From primary config
          dark: "hsl(var(--primary-dark))",   // From primary config
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))", // From primary config
          dark: "hsl(var(--secondary-dark))",   // From primary config
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: { // From primary config
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: { // From primary config
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Using primary config as default
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        lgAlt: "var(--radius-lg)", // From duplicate config
        mdAlt: "var(--radius-md)",
        smAlt: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif", "var(--font-sans)"], // Unified options
        mono: ["var(--font-mono)"], // Added from duplicate
      },
      keyframes: { // Added from duplicate
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: { // Added from duplicate
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    glassPlugin,
  ],
} satisfies Config;
