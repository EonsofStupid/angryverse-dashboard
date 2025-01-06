import { Database } from "@/integrations/supabase/types";

export type TableNames = keyof Database['public']['Tables'];

export interface TableInfo {
  name: TableNames;
  schema: string;
  is_updatable: boolean;
}

export interface TableData {
  [key: string]: any;
}