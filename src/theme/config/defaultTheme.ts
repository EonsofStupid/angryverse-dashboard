import type { Theme, ThemeConfiguration } from '@/types/theme/core';

const baseEffectState = {
  enabled: true,
  priority: 'database' as const,
  source: 'database' as const,
};

export const defaultThemeConfig: ThemeConfiguration = {
  colors: {
    cyber: {
      dark: '#1a1b26',
      pink: {
        DEFAULT: '#ff007f',
        hover: '#ff1a8c'
      },
      cyan: {
        DEFAULT: '#00fff5',
        hover: '#1affff'
      },
      purple: '#7928ca',
      green: {
        DEFAULT: '#4ade80',
        hover: '#22c55e'
      },
      yellow: {
        DEFAULT: '#fde047',
        hover: '#facc15'
      }
    }
  },
  typography: {
    fonts: {
      sans: ['Inter', 'sans-serif'],
      cyber: ['Inter', 'sans-serif']
    }
  },
  effects: {
    glass: {
      ...baseEffectState,
      background: 'rgba(0, 0, 0, 0.1)',
      blur: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      shadow_composition: {
        offset_y: '4px',
        blur_radius: '6px',
        spread_radius: '0px',
        opacity: 0.1
      }
    }
  }
};

export const defaultTheme: Theme = {
  id: 'default',
  name: 'Default Theme',
  description: 'Default system theme',
  is_default: true,
  status: 'active',
  created_by: '',
  configuration: defaultThemeConfig,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};