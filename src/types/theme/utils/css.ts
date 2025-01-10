export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue = `${number}${CSSUnit}`;
export type CSSColor = string;

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

export type ColorToken = {
  value: string;
  variable: string;
};

export type ColorTokens = {
  [key: string]: ColorToken;
};

export const isValidThemeColor = (color: unknown): color is CSSColor => {
  if (typeof color !== 'string') return false;
  return color.startsWith('var(--') || 
         color.startsWith('#') || 
         color.startsWith('rgb(') || 
         color.startsWith('rgba(') ||
         color.startsWith('hsl(');
};