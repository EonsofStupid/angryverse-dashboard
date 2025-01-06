import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TableNames, TableData } from "@/types/database-management";
import { useToast } from "@/hooks/use-toast";

export function useTableData(tableName: TableNames | null, searchQuery: string) {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['table-data', tableName, searchQuery],
    enabled: !!tableName,
    queryFn: async () => {
      if (!tableName) return [];

      let query = supabase
        .from(tableName)
        .select('*');

      if (searchQuery) {
        // Basic search across all text columns
        query = query.or(`id.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as TableData[];
    },
  });
}