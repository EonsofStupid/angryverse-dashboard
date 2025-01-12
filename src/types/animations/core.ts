export type Duration = `${number}${'ms' | 's'}`;
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export type EasingFunction = TimingFunction;

export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export interface AnimationState {
  isAnimating: boolean;
  direction: AnimationDirection;
  fillMode: AnimationFillMode;
  duration: Duration;
  timing: TimingFunction;
}

export interface AnimationConfig {
  duration: Duration;
  timing: TimingFunction;
  delay?: Duration;
}