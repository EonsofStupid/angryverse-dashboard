// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  // ...
  theme: {
    extend: {
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
