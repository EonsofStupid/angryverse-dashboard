export type Duration = `${number}${'ms' | 's'}`;
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export interface AnimationCurves {
  linear: TimingFunction;
  ease_out: TimingFunction;
  ease_in: TimingFunction;
  ease_in_out: TimingFunction;
}

export interface AnimationTiming {
  fast: Duration;
  normal: Duration;
  slow: Duration;
  very_slow: Duration;
}

export interface AnimationEffects {
  timing: AnimationTiming;
  curves: AnimationCurves;
}