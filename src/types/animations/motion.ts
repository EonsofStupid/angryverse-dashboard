import type { CSSValue } from '../theme/utils/css';
import type { AnimationConfig } from './core';

export type PathType = 'linear' | 'curved' | 'circular' | 'custom';
export type PathAlignment = 'auto' | 'start' | 'center' | 'end';

export interface MotionPath {
  type: PathType;
  path: string;
  alignment?: PathAlignment;
  autoRotate?: boolean;
  offset?: CSSValue;
}

export interface MotionConfig extends AnimationConfig {
  path: MotionPath;
  anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

export interface MotionState extends AnimationState {
  progress: number;
  velocity: number;
  direction: 1 | -1;
}