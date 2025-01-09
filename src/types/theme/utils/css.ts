// Basic CSS Units and Values
export type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vh' | 'vw';
export type CSSValue<T extends CSSUnit = CSSUnit> = `${number}${T}`;

// Color Types
export type HexColor = `#${string}`;
export type RGBColor = `rgb(${number}, ${number}, ${number})`;
export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HSLColor = `hsl(${number}, ${number}%, ${number}%)`;
export type HSLAColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;
export type CSSColor = HexColor | RGBColor | RGBAColor | HSLColor | HSLAColor;
export type CSSVariable = `var(--${string})`;

// Transform and Filter Types
export type TransformValue =
  | `scale(${number})`
  | `rotate(${number}deg)`
  | `translate(${CSSValue}, ${CSSValue})`
  | `skew(${number}deg, ${number}deg)`;

export type FilterValue =
  | `blur(${CSSValue})`
  | `brightness(${number}%)`
  | `contrast(${number}%)`
  | `grayscale(${number}%)`
  | `hue-rotate(${number}deg)`
  | `invert(${number}%)`
  | `opacity(${number}%)`
  | `saturate(${number}%)`
  | `sepia(${number}%)`
  | `drop-shadow(${string})`;

// CSS Variable Types for Theme System
export type ThemeColorVariable = {
  [key: string]: CSSVariable | ThemeColorVariable;
};

export type ThemeSpacingVariable = {
  [key: string]: CSSValue;
};

export type ThemeRadiusVariable = {
  [key: string]: CSSValue;
};