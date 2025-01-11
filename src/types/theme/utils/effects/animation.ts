export type TimingCurve = 
  | 'linear'
  | 'cubic-bezier(0, 0, 0.2, 1)'
  | 'cubic-bezier(0.4, 0, 1, 1)'
  | 'cubic-bezier(0.4, 0, 0.2, 1)';

export interface AnimationCurves {
  linear: 'linear';
  ease_out: 'cubic-bezier(0, 0, 0.2, 1)';
  ease_in: 'cubic-bezier(0.4, 0, 1, 1)';
  ease_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)';
}

export interface AnimationTiming {
  fast: '100ms';
  normal: '200ms';
  slow: '300ms';
  very_slow: '1000ms';
}

export interface AnimationEffects {
  curves: AnimationCurves;
  timing: AnimationTiming;
}

export type Duration = `${number}${'ms' | 's'}`;
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export interface AnimationCurves {
  linear: 'linear';
  ease_out: 'cubic-bezier(0, 0, 0.2, 1)';
  ease_in: 'cubic-bezier(0.4, 0, 1, 1)';
  ease_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)';
}

export interface AnimationTiming {
  fast: Duration;
  normal: Duration;
  slow: Duration;
  very_slow: Duration;
}

export interface AnimationEffects {
  curves: AnimationCurves;
  timing: AnimationTiming;
}