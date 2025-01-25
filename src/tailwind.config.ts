import type { Config } from "tailwindcss";
import { glassPlugin } from "./theme/plugins/glass";

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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "cyber-lines": {
          "0%": {
            "background-position": "0% 100%",
          },
          "100%": {
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        "cyber-lines": "cyber-lines 12s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    glassPlugin,
    function ({ addUtilities }) {
      addUtilities({
        ".clip-trapezoid": {
          clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)",
        },
        ".bg-cyber-lines": {
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 255, 255, 0.05) 0px,
            transparent 1px,
            transparent 20px
          )`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        },
      });
    },
  ],
} satisfies Config;