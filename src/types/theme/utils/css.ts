export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue<T extends CSSUnit = 'px'> = `${number}${T}`;
export type HSLValue = `${number} ${number}% ${number}%`;
export type CSSVariable = `var(--${string})`;

export type CSSColor = 
  | `#${string}` 
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `hsl(${HSLValue})`
  | `hsla(${HSLValue}, ${number})`
  | CSSVariable;

export function isValidCSSValue(value: unknown): value is CSSValue {
  if (typeof value !== 'string') return false;
  return /^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(value);
}

export function isValidCSSColor(value: unknown): value is CSSColor {
  if (typeof value !== 'string') return false;
  
  // CSS Variable
  if (value.startsWith('var(--')) return true;
  
  // Hex
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) return true;
  
  // RGB/RGBA
  if (/^rgb(a)?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(\s*,\s*(?:0?\.)?\d+)?\s*\)$/.test(value)) return true;
  
  // HSL/HSLA
  if (/^hsl(a)?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%(\s*,\s*(?:0?\.)?\d+)?\s*\)$/.test(value)) return true;
  
  return false;
}