import type { Config } from "tailwindcss";

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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "float": "float 3s ease-in-out infinite"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      
      gradientColorStops: {
        'cyber-start': 'hsl(var(--gradient-start))',
        'cyber-end': 'hsl(var(--gradient-end))',
        'success-start': 'hsl(var(--success))',
        'success-end': 'hsl(var(--success-light))',
        'warning-start': 'hsl(var(--warning))',
        'warning-end': 'hsl(var(--warning-light))',
        'info-start': 'hsl(var(--info))',
        'info-end': 'hsl(var(--info-light))',
        'error-start': 'hsl(var(--error))',
        'error-end': 'hsl(var(--error-light))',
        'primary-fade': 'hsl(var(--primary) / 0.8)',
        'secondary-fade': 'hsl(var(--secondary) / 0.8)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          '@apply bg-white/10 backdrop-blur-md border border-white/20 shadow-lg': {},
        },
        '.hover-glow': {
          '@apply transition-all duration-300 hover:shadow-lg hover:shadow-primary/20': {},
        },
        '.text-gradient': {
          '@apply bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60': {},
        },
        '.card-hover': {
          '@apply transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg': {},
        },
        '.neo-blur': {
          '@apply backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg': {},
        },
        '.gradient-border': {
          'border-image': 'linear-gradient(to right, var(--primary), var(--secondary)) 1',
          'border-image-slice': '1',
        },
        '.animated-bg': {
          'background': 'linear-gradient(45deg, var(--primary), var(--secondary))',
          'background-size': '200% 200%',
          'animation': 'gradient 15s ease infinite',
        },
        '.cyber-gradient': {
          '@apply bg-gradient-to-r from-cyber-start to-cyber-end': {},
        },
        '.success-gradient': {
          '@apply bg-gradient-to-r from-success-start to-success-end': {},
        },
        '.warning-gradient': {
          '@apply bg-gradient-to-r from-warning-start to-warning-end': {},
        },
        '.info-gradient': {
          '@apply bg-gradient-to-r from-info-start to-info-end': {},
        },
        '.error-gradient': {
          '@apply bg-gradient-to-r from-error-start to-error-end': {},
        },
        '.hover-scale': {
          '@apply transition-transform duration-300 hover:scale-105': {},
        },
        '.hover-lift': {
          '@apply transition-all duration-300 hover:-translate-y-1 hover:shadow-xl': {},
        },
        '.hover-pulse': {
          '@apply transition-all duration-300 hover:animate-pulse': {},
        },
        '.hover-gradient': {
          '@apply transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-primary-fade': {},
        },
        '.active-scale': {
          '@apply active:scale-95 transition-transform': {},
        },
        '.active-lift': {
          '@apply active:translate-y-0.5 transition-transform': {},
        },
      })
    }
  ],
} satisfies Config;
