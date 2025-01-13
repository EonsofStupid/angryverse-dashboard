import { z } from 'zod';

export const isThemeConfiguration = (value: unknown): value is ThemeConfiguration => {
  try {
    return value !== null &&
      typeof value === 'object' &&
      'colors' in value &&
      'typography' in value &&
      'effects' in value;
  } catch {
    return false;
  }
};