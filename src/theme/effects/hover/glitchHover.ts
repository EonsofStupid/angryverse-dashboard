// src/lib/effects/hover/glitchHover.ts

export interface GlitchHoverConfig {
  glitchColor?: string;
  glitchIntensity?: number; // 1-10 scale
}

export const defaultGlitchHoverConfig: GlitchHoverConfig = {
  glitchColor: "var(--theme-colors-cyber-plasma)",
  glitchIntensity: 5,
};

export function generateGlitchHoverCSS(config?: GlitchHoverConfig): string {
  const { glitchColor, glitchIntensity } = { ...defaultGlitchHoverConfig, ...config };
  return `
    /* Glitch Hover Effect */
    .glitch-hover {
      position: relative;
      overflow: hidden;
    }
    .glitch-hover::before,
    .glitch-hover::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .glitch-hover:hover::before {
      opacity: 0.8;
      left: ${glitchIntensity}px;
      text-shadow: -${glitchIntensity}px 0 ${glitchColor};
    }
    .glitch-hover:hover::after {
      opacity: 0.8;
      left: -${glitchIntensity}px;
      text-shadow: ${glitchIntensity}px 0 ${glitchColor};
    }
  `;
}

export default {
  name: "Glitch Hover",
  category: "hover",
  config: defaultGlitchHoverConfig,
  generateCSS: generateGlitchHoverCSS,
};
