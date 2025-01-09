import { EffectState, CSSValue, Duration, TimingFunction } from '@/types/theme';

export interface MagneticEffectState extends EffectState {
  strength: number;
  radius: CSSValue;
  smoothing: number;
  
  animation: {
    duration: Duration;
    easing: TimingFunction;
    reset_duration: Duration;
  };
  
  transform: {
    scale: number;
    rotation: number;
    perspective: CSSValue;
    origin: string;
  };
  
  boundaries: {
    min_distance: CSSValue;
    max_distance: CSSValue;
    threshold: number;
  };
  
  interaction: {
    hover_scale: number;
    click_effect: boolean;
    momentum: boolean;
    resistance: number;
  };
}