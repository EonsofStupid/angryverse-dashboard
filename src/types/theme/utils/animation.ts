export type Duration = `${number}${'ms' | 's'}`;
export type TimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

export interface AnimationConfig {
  duration: Duration;
  timing: TimingFunction;
  delay?: Duration;
}

export interface TransitionConfig {
  property: string;
  duration: Duration;
  timing: TimingFunction;
  delay?: Duration;
}