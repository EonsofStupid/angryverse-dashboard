export type HSLValue = `${number} ${number}% ${number}%`;
export type CSSVariable = `var(--${string})`;
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue<T extends CSSUnit = 'px'> = `${number}${T}`;

export type CSSColor = 
  | `#${string}` 
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `hsl(${HSLValue})`
  | `hsla(${HSLValue}, ${number})`
  | CSSVariable;

export const isValidThemeColor = (value: unknown): value is CSSColor => {
  if (typeof value !== 'string') return false;
  
  // Check if it's a CSS variable
  if (value.startsWith('var(--')) return true;
  
  // Check if it's a hex color
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) return true;
  
  // Check if it's rgb/rgba
  if (/^rgb(a)?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/.test(value)) return true;
  
  // Check if it's hsl/hsla
  if (/^hsl(a)?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%(\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/.test(value)) return true;
  
  return false;
};