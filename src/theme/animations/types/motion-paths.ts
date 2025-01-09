import { EffectState, CSSValue, Duration } from '@/types/theme';
import { EasingFunction, AnimationDirection } from './keyframes';

export type PathType = 'linear' | 'curved' | 'circular' | 'custom';
export type PathAlignment = 'auto' | 'start' | 'center' | 'end';

export interface MotionPathState extends EffectState {
  path: {
    type: PathType;
    definition: string;
    alignment: PathAlignment;
    rotate: boolean;
    spacing: CSSValue;
  };
  
  timing: {
    duration: Duration;
    delay: Duration;
    easing: EasingFunction;
    iterations: number | 'infinite';
    direction: AnimationDirection;
  };
  
  options: {
    anchor_point: 'center' | 'top' | 'bottom' | 'left' | 'right';
    distance: CSSValue;
    offset_rotation: string;
    auto_rotate: boolean;
  };
  
  sync: {
    group_id?: string;
    sequence_index?: number;
    stagger_delay?: Duration;
  };
}