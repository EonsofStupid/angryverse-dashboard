import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TableNames, TableRowData } from "@/types/database-management";

export const useTableData = (tableName: TableNames, searchQuery: string = "") => {
  return useQuery({
    queryKey: ["table-data", tableName, searchQuery],
    queryFn: async (): Promise<TableRowData[]> => {
      if (!tableName) return [];

      const query = supabase
        .from(tableName)
        .select("*");

      if (searchQuery) {
        // Add text search if needed
        query.textSearch('content', searchQuery, {
          type: 'websearch',
          config: 'english'
        });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as TableRowData[];
    },
    enabled: !!tableName,
  });
};