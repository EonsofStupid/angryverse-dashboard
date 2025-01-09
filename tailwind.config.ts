import type { Config } from "tailwindcss";
import { glassPlugin } from "./src/theme/plugins/glass";

export default {
  darkMode: ["class"],
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
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          1: "hsl(var(--accent-1))",
          2: "hsl(var(--accent-2))",
          3: "hsl(var(--accent-3))",
          4: "hsl(var(--accent-4))",
          5: "hsl(var(--accent-5))",
          6: "hsl(var(--accent-6))",
          7: "hsl(var(--accent-7))",
          8: "hsl(var(--accent-8))",
          9: "hsl(var(--accent-9))",
          10: "hsl(var(--accent-10))",
          11: "hsl(var(--accent-11))",
          12: "hsl(var(--accent-12))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        base: {
          1: "hsl(var(--base-1))",
          2: "hsl(var(--base-2))",
          3: "hsl(var(--base-3))",
          4: "hsl(var(--base-4))",
          5: "hsl(var(--base-5))",
          6: "hsl(var(--base-6))",
          7: "hsl(var(--base-7))",
          8: "hsl(var(--base-8))",
          9: "hsl(var(--base-9))",
          10: "hsl(var(--base-10))",
          11: "hsl(var(--base-11))",
          12: "hsl(var(--base-12))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    glassPlugin,
  ],
} satisfies Config;