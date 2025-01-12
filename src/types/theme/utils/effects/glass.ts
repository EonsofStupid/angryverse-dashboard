export interface GlassEffects {
  enabled: boolean;
  priority: 'database' | 'fallback' | 'hybrid';
  source: 'database' | 'fallback';
  background: string;
  blur: string;
  border: string;
  shadow_composition?: {
    offset_y: string;
    blur_radius: string;
    spread_radius: string;
    opacity: number;
  }
}