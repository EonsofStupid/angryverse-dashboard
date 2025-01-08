export type ThemeColors = {
  cyber: {
    dark: string;
    pink: {
      DEFAULT: string;
      hover: string;
    };
    cyan: {
      DEFAULT: string;
      hover: string;
    };
    purple: string;
    green: {
      DEFAULT: string;
      hover: string;
    };
    yellow: {
      DEFAULT: string;
      hover: string;
    };
  };
};

export type ThemeTypography = {
  fonts: {
    sans: string[];
    cyber: string[];
  };
};

export type GlassEffects = {
  background: string;
  blur: string;
  border: string;
  blur_levels?: string[];
  opacity_levels?: number[];
  border_styles?: {
    light: string;
    medium: string;
    heavy: string;
  };
};

export type ThemeEffects = {
  glass: GlassEffects;
};

export type ThemeConfiguration = {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
};

export type Theme = {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  status: 'active' | 'inactive' | 'draft';
  configuration: ThemeConfiguration;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
};