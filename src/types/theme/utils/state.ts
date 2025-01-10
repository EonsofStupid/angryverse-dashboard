import { Theme } from '../core';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeStatus = 'active' | 'inactive' | 'draft';

export interface ThemeState {
  currentTheme: Theme | null;
  mode: ThemeMode;
  status: ThemeStatus;
  isLoading: boolean;
  error: Error | null;
}

export type ThemeAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_MODE'; payload: ThemeMode }
  | { type: 'SET_STATUS'; payload: ThemeStatus }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | null };