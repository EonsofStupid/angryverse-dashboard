// src/lib/effects/hover/neonPulse.ts

export interface NeonPulseConfig {
  pulseColor?: string;
  pulseDuration?: number; // seconds
}

export const defaultNeonPulseConfig: NeonPulseConfig = {
  pulseColor: "var(--theme-colors-cyber-electric)", // using your CSS token
  pulseDuration: 2,
};

export function generateNeonPulseCSS(config?: NeonPulseConfig): string {
  const { pulseColor, pulseDuration } = { ...defaultNeonPulseConfig, ...config };
  return `
    /* Neon Pulse Effect */
    .neon-pulse {
      transition: box-shadow ${pulseDuration}s ease-in-out;
    }
    .neon-pulse:hover {
      box-shadow: 0 0 20px ${pulseColor}, 0 0 30px ${pulseColor};
    }
  `;
}

export default {
  name: "Neon Pulse",
  category: "hover",
  config: defaultNeonPulseConfig,
  generateCSS: generateNeonPulseCSS,
};
