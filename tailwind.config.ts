import type { Config } from "tailwindcss";
import { themeEffects } from "./src/theme";

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
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to right bottom, rgba(255, 255, 255, var(--glass-opacity)), rgba(255, 255, 255, calc(var(--glass-opacity) + 0.05)))',
        'glass-shine': 'linear-gradient(45deg, rgba(255,255,255,0) 45%, rgba(255,255,255,calc(var(--glass-opacity) + 0.1)) 50%, rgba(255,255,255,0) 55%)',
        'glass-border': 'var(--glass-border)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))",
          dark: "hsl(var(--success-dark))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          light: "hsl(var(--warning-light))",
          dark: "hsl(var(--warning-dark))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          light: "hsl(var(--info-light))",
          dark: "hsl(var(--info-dark))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
          light: "hsl(var(--error-light))",
          dark: "hsl(var(--error-dark))",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
      ...themeEffects.theme?.extend,
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities({
        '.glass-morphism': {
          '@apply backdrop-blur-[var(--glass-blur)] bg-white/[var(--glass-opacity)] border-[var(--glass-border)] shadow-lg relative overflow-hidden': {},
          '&::before': {
            content: '""',
            '@apply absolute inset-0 bg-glass-gradient pointer-events-none': {},
          },
          '&::after': {
            content: '""',
            '@apply absolute inset-0 bg-glass-shine animate-shine pointer-events-none': {},
          },
        },
        '.glass-card': {
          '@apply backdrop-blur-[var(--glass-blur)] bg-white/[var(--glass-opacity)] border-[var(--glass-border)] shadow-xl': {},
          'background': 'linear-gradient(145deg, rgba(255,255,255,var(--glass-opacity)) 0%, rgba(255,255,255,calc(var(--glass-opacity) + 0.05)) 100%)',
        },
      });
    },
    ...themeEffects.plugins || [],
  ],
} satisfies Config;