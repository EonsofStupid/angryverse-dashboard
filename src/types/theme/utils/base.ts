import { Theme, ThemeConfiguration } from '../core';

// Base utility types for theme system
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type TypedRecord<K extends string | number | symbol, T> = {
    [P in K]: T;
};

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// Theme-specific utility types
export type ThemeUpdate = DeepPartial<ThemeConfiguration>;
export type ThemeOverride = Partial<Theme>;
export type ThemeValidator = {
    [K in keyof ThemeConfiguration]: (value: ThemeConfiguration[K]) => boolean;
};