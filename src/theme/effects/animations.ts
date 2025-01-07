import { Config } from "tailwindcss";

export const animationEffects: Partial<Config> = {
  theme: {
    extend: {
      keyframes: {
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'neon-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 4px hsl(var(--admin-primary)), 0 0 11px hsl(var(--admin-primary)), 0 0 19px hsl(var(--admin-primary))',
          },
          '50%': {
            textShadow: '0 0 4px hsl(var(--admin-primary)), 0 0 20px hsl(var(--admin-primary)), 0 0 40px hsl(var(--admin-primary))',
          },
        },
        'morph-background': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        'shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 1.5s ease-in-out infinite',
        'morph': 'morph-background 8s ease-in-out infinite',
        'shine': 'shine 6s linear infinite',
      },
    },
  },
};