// Base CSS types
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue<T extends CSSUnit = CSSUnit> = `${number}${T}`;

// HSL and CSS Variable types
export type HSLValue = `${number} ${number}% ${number}%`;
export type CSSVariable = `var(--${string})`;

export type CSSColor = 
  | `#${string}` 
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `hsl(${HSLValue})`
  | `hsla(${HSLValue}, ${number})`
  | CSSVariable;

export type ThemeColor = {
  DEFAULT: CSSColor;
  hover?: CSSColor;
};

export type CyberColors = {
  dark: CSSColor;
  pink: ThemeColor;
  cyan: ThemeColor;
  purple: CSSColor;
  green: ThemeColor;
  yellow: ThemeColor;
};

export const isValidThemeColor = (color: unknown): color is CSSColor => {
  if (typeof color !== 'string') return false;
  
  // Check for CSS variable format
  if (color.startsWith('var(--')) return true;
  
  // Check for hex format
  if (color.startsWith('#')) return true;
  
  // Check for rgb/rgba format
  if (color.startsWith('rgb(') || color.startsWith('rgba(')) return true;
  
  // Check for hsl/hsla format
  if (color.startsWith('hsl(') || color.startsWith('hsla(')) return true;
  
  // Check for HSL space-separated values (240 20% 99%)
  const hslPattern = /^\d+\s+\d+%\s+\d+(\.\d+)?%$/;
  if (hslPattern.test(color)) return true;
  
  return false;
};