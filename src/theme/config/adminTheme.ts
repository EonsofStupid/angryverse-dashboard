import type { Theme, ThemeConfiguration } from '@/types/theme/core';

const baseEffectState = {
  enabled: true,
  priority: 'database' as const,
  source: 'database' as const,
};

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
    },
    hover: {
      ...baseEffectState,
      scale: 1.05,
      lift: '-4px',
      glow_strength: '10px',
      transition_duration: '300ms',
      glow_color: 'var(--theme-primary)',
      glow_opacity: 0.5,
      glow_spread: '4px',
      glow_blur: '8px',
      shadow_normal: '0 4px 6px rgba(0, 0, 0, 0.1)',
      shadow_hover: '0 8px 12px rgba(0, 0, 0, 0.15)'
    },
    animations: {
      ...baseEffectState,
      timing: {
        fast: '100ms',
        normal: '200ms',
        slow: '300ms',
        very_slow: '1000ms'
      },
      curves: {
        linear: 'linear',
        ease_out: 'cubic-bezier(0, 0, 0.2, 1)',
        ease_in: 'cubic-bezier(0.4, 0, 1, 1)',
        ease_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }
};

export const adminTheme: Theme = {
  id: 'admin',
  name: 'Admin Theme',
  description: 'Default admin interface theme',
  is_default: false,
  status: 'active',
  created_by: '',
  configuration: adminThemeConfig,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};