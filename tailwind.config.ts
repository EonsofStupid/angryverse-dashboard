import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      keyframes: {
        "cyber-lines": {
          "0%": {
            "background-position": "0% 100%",
          },
          "100%": {
            "background-position": "0% 0%",
          },
        },
        "scan-line": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
        "pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.85",
            transform: "scale(1.05)",
          },
        },
        "glitch": {
          "0%": {
            transform: "translate(0)",
          },
          "20%": {
            transform: "translate(-2px, 2px)",
          },
          "40%": {
            transform: "translate(-2px, -2px)",
          },
          "60%": {
            transform: "translate(2px, 2px)",
          },
          "80%": {
            transform: "translate(2px, -2px)",
          },
          "100%": {
            transform: "translate(0)",
          },
        },
      },
      animation: {
        "cyber-lines": "cyber-lines 12s linear infinite",
        "scan-line": "scan-line 4s linear infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch": "glitch 0.3s ease infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".clip-trapezoid": {
          clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)",
        },
        ".bg-cyber-lines": {
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(155, 135, 245, 0.15) 0px,
            transparent 1px,
            transparent 20px
          )`,
          backgroundSize: "100% 20px",
          backgroundRepeat: "repeat",
        },
        ".bg-noise": {
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        },
      });
    },
  ],
} satisfies Config;