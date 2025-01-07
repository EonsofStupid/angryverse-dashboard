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
      /**
       * ==========================
       *  1) COLOR PALETTES
       * ==========================
       */
      colors: {
        // Original site colors
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

        // NEW: Admin color palette
        admin: {
          background: "hsl(var(--admin-background))",
          foreground: "hsl(var(--admin-foreground))",
          primary: "hsl(var(--admin-primary))",
          secondary: "hsl(var(--admin-secondary))",
          accent: "hsl(var(--admin-accent))",
          error: "hsl(var(--admin-error))",
          warning: "hsl(var(--admin-warning))",
          success: "hsl(var(--admin-success))",
          info: "hsl(var(--admin-info))",
        },
      },

      /**
       * ==========================
       *  2) BORDER RADII
       * ==========================
       */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /**
       * ==========================
       *  3) KEYFRAMES & ANIMATIONS
       * ==========================
       */
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
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },

        /* NEW: Some cutting-edge examples */
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(2px, -2px)" },
          "60%": { transform: "translate(-1px, 1px)" },
          "80%": { transform: "translate(1px, 0)" },
          "100%": { transform: "translate(0)" },
        },
        "neon-pulse": {
          "0%, 100%": { textShadow: "0 0 4px hsl(var(--primary)), 0 0 12px hsl(var(--primary))", opacity: "1" },
          "50%": { textShadow: "0 0 8px hsl(var(--primary)), 0 0 20px hsl(var(--primary))", opacity: "0.8" },
        },
        "rotating-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",

        /* NEW: Extra animations */
        "glitch": "glitch 0.5s infinite",
        "neon-pulse": "neon-pulse 1.5s infinite ease-in-out",
        "rotating-gradient": "rotating-gradient 4s ease-in-out infinite",
      },

      /**
       * ==========================
       *  4) FONTS
       * ==========================
       */
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      /**
       * ==========================
       *  5) GRADIENT STOPS
       * ==========================
       */
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

        // NEW: Admin-specific gradients
        'admin-primary-start': 'hsl(var(--admin-primary))',
        'admin-primary-end': 'hsl(var(--admin-primary) / 0.7)',
        'admin-secondary-start': 'hsl(var(--admin-secondary))',
        'admin-secondary-end': 'hsl(var(--admin-secondary) / 0.7)',
      },
    },
  },

  /**
   * ==========================
   *  6) PLUGINS / CUSTOM UTILITIES
   * ==========================
   */
  plugins: [
    require("tailwindcss-animate"),

    // Example plugin with new classes
    function({ addUtilities }) {
      addUtilities({
        /* Existing classes from your config */
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

        /* NEW Admin or advanced classes */
        '.admin-glass': {
          '@apply bg-admin-background/10 backdrop-blur-sm border border-admin-foreground/20 shadow-2xl': {},
        },
        '.admin-gradient': {
          '@apply bg-gradient-to-r from-admin-primary to-admin-secondary': {},
        },
        '.glitch-text': {
          '@apply relative inline-block': {},
          'animation': 'glitch 0.5s infinite',
          // Additional glitch layering or pseudo-elements can be done in CSS:
        },
        '.neon-text': {
          'color': 'hsl(var(--primary))',
          'animation': 'neon-pulse 1.5s infinite ease-in-out',
        },
        '.rotating-bg': {
          'background': 'linear-gradient(270deg, var(--primary), var(--secondary))',
          'background-size': '400% 400%',
          'animation': 'rotating-gradient 4s ease-in-out infinite',
        },
      })
    }
  ],
} satisfies Config;