export interface EffectState {
  enabled: boolean;
  priority: 'database' | 'local' | 'override';
  source: 'database' | 'local' | 'override';
}