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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "right center"
          }
        },
      },
      animation: {
        "cyber-lines": "cyber-lines 12s linear infinite",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out forwards",
        "glitch": "glitch 3s infinite steps(2, jump-none)",
        "gradient-x": "gradient-x 15s ease infinite",
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