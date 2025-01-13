export type Duration = `${number}ms` | `${number}s`;
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export type EasingFunction = TimingFunction;

export interface AnimationConfig {
  duration: Duration;
  timing: TimingFunction;
  delay?: Duration;
}