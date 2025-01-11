export type EffectPriority = 'database' | 'fallback' | 'hybrid';

export interface EffectState {
  enabled: boolean;
  priority: EffectPriority;
  source: 'database' | 'fallback';
}