export interface MotionEffect {
  duration: number;
  delay?: number;
  ease: string;
  direction?: 'normal' | 'reverse' | 'alternate';
  iterations?: number;
}

export interface MotionConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
  iterations?: number;
}