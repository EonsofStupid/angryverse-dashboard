export type EffectPriority = 'database' | 'fallback' | 'hybrid';
export type EffectSource = 'database' | 'fallback';

export interface EffectState {
  enabled: boolean;
  priority: EffectPriority;
  source: EffectSource;
}