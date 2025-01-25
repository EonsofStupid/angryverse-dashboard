import { Database } from "@/integrations/supabase/types";

export type TableNames = keyof Database['public']['Tables'];

export interface TableInfo {
  name: TableNames;
  schema: string;
  is_updatable: boolean;
}

// Define a base type for table data that handles JSON fields explicitly
export type TableRowData = {
  id: string;
  [key: string]: string | number | boolean | null | object;
};

export type TableData = TableRowData[];