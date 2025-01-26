export interface GlitchEffect {
  intensity: number;
  frequency: number;
  colors: string[];
  duration: number;
}

export interface GlitchConfig {
  intensity?: number;
  frequency?: number;
  customColors?: string[];
  duration?: number;
}