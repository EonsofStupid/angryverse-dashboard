import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TableInfo } from "@/types/database-management";
import { useToast } from "@/hooks/use-toast";

export function useTableList() {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['database-tables'],
    queryFn: async () => {
      // This query gets all tables from the public schema
      const { data, error } = await supabase
        .rpc('get_tables');

      if (error) {
        toast({
          title: "Error fetching tables",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as TableInfo[];
    },
  });
}