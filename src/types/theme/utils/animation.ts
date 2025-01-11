export type Duration = '100ms' | '200ms' | '300ms' | '500ms' | '1000ms';
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export interface AnimationTiming {
  fast: '100ms';
  normal: '200ms';
  slow: '300ms';
  very_slow: '1000ms';
}

export interface AnimationCurves {
  linear: TimingFunction;
  ease_out: TimingFunction;
  ease_in: TimingFunction;
  ease_in_out: TimingFunction;
}

export interface AnimationEffects {
  timing: AnimationTiming;
  curves: AnimationCurves;
}