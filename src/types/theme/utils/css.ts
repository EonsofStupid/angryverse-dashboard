// CSS Units and Values
export type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vh' | 'vw';
export type CSSValue<T extends CSSUnit = CSSUnit> = `${number}${T}`;

// Colors
export type HexColor = `#${string}`;
export type RGBColor = `rgb(${number}, ${number}, ${number})`;
export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HSLColor = `hsl(${number}, ${number}%, ${number}%)`;
export type HSLAColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;
export type CSSColor = HexColor | RGBColor | RGBAColor | HSLColor | HSLAColor;

// Transforms
export type TransformValue = 
    | `scale(${number})`
    | `rotate(${number}deg)`
    | `translate(${CSSValue}, ${CSSValue})`
    | `skew(${number}deg, ${number}deg)`;

// Filters
export type FilterValue =
    | `blur(${CSSValue})`
    | `brightness(${number}%)`
    | `contrast(${number}%)`
    | `grayscale(${number}%)`
    | `hue-rotate(${number}deg)`
    | `invert(${number}%)`
    | `opacity(${number}%)`
    | `saturate(${number}%)`
    | `sepia(${number}%)`;