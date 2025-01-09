import { Theme, ThemeConfiguration } from '@/types/theme';

export type ThemeUpdateChannel = 'theme' | 'tokens' | 'effects' | 'all';

export interface RealtimeUpdateConfig {
  channels: ThemeUpdateChannel[];
  debounce: number;
  batch: boolean;
  priority: 'high' | 'normal' | 'low';
}

export interface ThemeUpdateEvent {
  type: 'theme' | 'token' | 'effect';
  path: string[];
  value: any;
  timestamp: number;
  source: string;
}

export interface RealtimeState {
  enabled: boolean;
  config: RealtimeUpdateConfig;
  lastUpdate?: ThemeUpdateEvent;
  status: 'connected' | 'disconnected' | 'error';
}