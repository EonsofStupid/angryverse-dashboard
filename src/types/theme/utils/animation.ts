export type Duration = `${number}${'ms' | 's'}`;
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export interface AnimationConfig {
  duration: Duration;
  timing: TimingFunction;
  delay?: Duration;
}

export interface TransitionConfig extends AnimationConfig {
  property: string;
}

export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export interface KeyframeConfig {
  name: string;
  duration: Duration;
  timing: TimingFunction;
  delay?: Duration;
  iterations?: number | 'infinite';
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
}