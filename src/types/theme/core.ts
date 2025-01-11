import { ThemeMode, ThemeStatus, EffectPriority } from './utils/base';
import { ThemeEffects } from './utils/effects';
import { CSSColor } from './utils/css';

export interface ThemeColors {
  cyber: {
    dark: CSSColor;
    pink: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
    cyan: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
    purple: CSSColor;
    green: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
    yellow: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
  };
}

export interface GrayPalette {
  neutral: CSSColor;
  soft: CSSColor;
  medium: CSSColor;
  light: CSSColor;
  silver: CSSColor;
  dark: CSSColor;
  mid: CSSColor;
}

export interface ThemeTypography {
  fonts: {
    sans: string[];
    cyber: string[];
  };
}

export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
  gray_palette?: GrayPalette;
}

export interface Theme {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  status: ThemeStatus;
  configuration: ThemeConfiguration;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}