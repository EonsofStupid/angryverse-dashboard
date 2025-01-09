import { CSSValue, CSSColor } from './css';
import { Duration, EasingFunction } from './animation';

// Glass Effect
export type GlassEffectLevel = 'none' | 'light' | 'medium' | 'heavy';
export type GlassEffectStyle = {
    background: string;
    blur: CSSValue;
    opacity: number;
    border: string;
};

// Glow Effect
export type GlowIntensity = 'subtle' | 'medium' | 'strong';
export type GlowConfig = {
    color: CSSColor;
    intensity: GlowIntensity;
    radius: CSSValue;
    animation?: {
        duration: Duration;
        easing: EasingFunction;
    };
};

// Matrix Effect
export type MatrixDensity = 'sparse' | 'normal' | 'dense';
export type MatrixConfig = {
    color: CSSColor;
    density: MatrixDensity;
    speed: Duration;
    opacity: number;
    characters?: string[];
};

// Holographic Effect
export type HolographicConfig = {
    intensity: number;
    angle: number;
    shimmer: number;
    rainbow: boolean;
};