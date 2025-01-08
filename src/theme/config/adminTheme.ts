import type { Theme, ThemeConfiguration } from '@/types/theme';

export const adminThemeConfig: ThemeConfiguration = {
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
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }
  }
};

export const adminTheme: Theme = {
  id: 'admin',
  name: 'Admin Theme',
  description: 'Default admin interface theme',
  is_default: false,
  status: 'active',
  configuration: adminThemeConfig,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};