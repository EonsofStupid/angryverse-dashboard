import type { CSSValue, CSSColor } from '@/types/theme/utils/css';
import type { AnimationConfig } from './core';

export interface KeyframeState extends AnimationConfig {
  name: string;
  
  transforms?: {
    translate?: {
      x?: CSSValue;
      y?: CSSValue;
      z?: CSSValue;
    };
    scale?: {
      x?: number;
      y?: number;
      z?: number;
    };
    rotate?: {
      x?: string;
      y?: string;
      z?: string;
    };
    skew?: {
      x?: string;
      y?: string;
    };
  };
  
  styles?: {
    opacity?: number;
    backgroundColor?: CSSColor;
    borderColor?: CSSColor;
    boxShadow?: string;
    filter?: string;
  };
}

export interface KeyframeDefinition {
  [percentage: string]: {
    transform?: string;
    opacity?: number;
    [key: string]: string | number | undefined;
  };
}