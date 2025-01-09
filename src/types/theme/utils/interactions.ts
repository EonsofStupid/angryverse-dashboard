import { CSSValue } from './css';
import { Duration } from './animation';

// Magnetic Effect
export type MagneticStrength = 'weak' | 'medium' | 'strong';
export type MagneticConfig = {
    strength: MagneticStrength;
    radius: CSSValue;
    smoothing: number;
    maxRotation?: number;
};

// Hover Effect
export type HoverTransition = {
    property: string;
    duration: Duration;
    easing: string;
    delay?: Duration;
};

export type HoverConfig = {
    scale?: number;
    rotate?: number;
    translate?: [CSSValue, CSSValue];
    transitions?: HoverTransition[];
};

// Scroll Effect
export type ScrollTriggerPoint = 'top' | 'center' | 'bottom' | number;
export type ScrollConfig = {
    trigger: ScrollTriggerPoint;
    offset?: CSSValue;
    duration?: Duration;
    once?: boolean;
};