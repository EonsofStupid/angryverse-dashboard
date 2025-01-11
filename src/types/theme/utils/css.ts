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