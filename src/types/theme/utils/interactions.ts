import type { CSSValue } from '../css';

export interface HoverConfig {
  scale: number;
  transitions?: {
    property: string;
    duration: string;
    easing: string;
  }[];
}

export type FilterValue = string;