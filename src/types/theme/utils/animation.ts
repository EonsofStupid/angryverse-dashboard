import { CSSValue } from './css';

// Timing and Duration
export type TimeUnit = 'ms' | 's';
export type Duration = `${number}${TimeUnit}`;

export type EasingFunction = 
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

export type AnimationDirection = 
    | 'normal'
    | 'reverse'
    | 'alternate'
    | 'alternate-reverse';

export type AnimationFillMode = 
    | 'none'
    | 'forwards'
    | 'backwards'
    | 'both';

// Keyframe utilities
export type KeyframePoint = '0%' | '25%' | '50%' | '75%' | '100%' | `${number}%`;
export type KeyframeDefinition = {
    [K in KeyframePoint]?: {
        transform?: string;
        opacity?: number;
        filter?: string;
        [key: string]: string | number | undefined;
    };
};