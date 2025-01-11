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

export const isValidThemeColor = (color: unknown): color is CSSColor => {
  if (typeof color !== 'string') return false;
  return /^(#|rgb|rgba|hsl|hsla|var\(--)/.test(color);
};