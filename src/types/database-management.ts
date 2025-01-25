import type { Json } from '@/integrations/supabase/types';

// Base type for JSON values
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

// Table information type based on get_tables() function
export interface TableInfo {
  name: string;
  schema: string;
  is_updatable: boolean;
}

// Specific table names type
export type TableNames = 
  | 'posts'
  | 'profiles'
  | 'comments'
  | 'categories'
  | 'media'
  | 'themes'
  | 'page_themes'
  | 'theme_presets'
  | 'theme_backups'
  | null;

// Type guard for JSON values
export function isJsonValue(value: unknown): value is JsonValue {
  if (value === null) return true;
  if (['string', 'number', 'boolean'].includes(typeof value)) return true;
  if (Array.isArray(value)) return value.every(isJsonValue);
  if (typeof value === 'object') {
    return Object.values(value as object).every(isJsonValue);
  }
  return false;
}

// Base type for all table rows
export interface BaseTableRow {
  id: string;
  created_at?: string;
  updated_at?: string;
}

// Type for table row data
export type TableRowData = BaseTableRow & {
  [key: string]: string | number | boolean | null | Json | undefined;
};

// Type guard for table row data
export function isTableRowData(value: unknown): value is TableRowData {
  if (!value || typeof value !== 'object') return false;
  if (!('id' in value)) return false;
  return true;
}