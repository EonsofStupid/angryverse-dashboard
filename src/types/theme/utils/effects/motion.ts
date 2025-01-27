export interface MotionPaths {
  ease_curves: string[];
  preset_paths: string[];
}

export interface ScrollTriggers {
  thresholds: number[];
  animation_types: string[];
  directions: string[];
  distances: string[];
}

export interface MotionTokens {
  paths: MotionPaths;
  scroll_triggers: ScrollTriggers;
}