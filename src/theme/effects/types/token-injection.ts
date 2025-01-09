import { Theme, ThemeConfiguration } from '@/types/theme';

export interface TokenInjectionConfig {
  target: keyof ThemeConfiguration;
  source: string;
  transform?: (value: any) => any;
  fallback?: any;
}

export interface TokenInjectionState {
  enabled: boolean;
  tokens: TokenInjectionConfig[];
  scope: 'global' | 'component' | 'route';
  priority: 'high' | 'normal' | 'low';
}

export interface TokenUpdateEvent {
  token: string;
  oldValue: any;
  newValue: any;
  timestamp: number;
}