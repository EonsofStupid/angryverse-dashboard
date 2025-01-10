export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue<T extends CSSUnit = CSSUnit> = `${number}${T}`;
export type CSSColor = `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;

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
  return color.startsWith('var(--') || 
         color.startsWith('#') || 
         color.startsWith('rgb(') || 
         color.startsWith('rgba(') ||
         color.startsWith('hsl(');
};