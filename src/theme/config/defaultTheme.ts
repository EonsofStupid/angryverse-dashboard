import type { Theme, ThemeConfiguration } from '@/types/theme';

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
      background: 'rgba(0, 0, 0, 0.1)',
      blur: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      blur_levels: ['none', 'sm', 'md', 'lg', 'xl'],
      opacity_levels: [0.1, 0.2, 0.3, 0.4, 0.5],
      border_styles: {
        light: '1px solid rgba(255, 255, 255, 0.1)',
        medium: '2px solid rgba(255, 255, 255, 0.15)',
        heavy: '3px solid rgba(255, 255, 255, 0.2)'
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
  configuration: defaultThemeConfig,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};