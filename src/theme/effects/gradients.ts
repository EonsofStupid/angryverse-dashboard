import { Config } from "tailwindcss";

export const gradientEffects: Partial<Config> = {
  theme: {
    extend: {
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)',
        'shifting-gradient': 'linear-gradient(45deg, hsl(var(--admin-primary)), hsl(var(--admin-secondary)), hsl(var(--admin-accent)))',
        'animated-border': 'linear-gradient(90deg, hsl(var(--admin-primary)), hsl(var(--admin-secondary)), hsl(var(--admin-accent)), hsl(var(--admin-primary)))',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.gradient-border': {
          'position': 'relative',
          '&::before': {
            content: '""',
            'position': 'absolute',
            'inset': '-2px',
            'z-index': '-1',
            'background': 'linear-gradient(90deg, hsl(var(--admin-primary)), hsl(var(--admin-secondary)))',
            'border-radius': 'inherit',
            'animation': 'border-rotate 4s linear infinite',
          },
        },
      });
    },
  ],
};