import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { TableInfo } from '@/types/database-management';

export function useTableList() {
  return useQuery({
    queryKey: ['tables'],
    queryFn: async (): Promise<TableInfo[]> => {
      const { data, error } = await supabase.rpc('get_tables');
      
      if (error) {
        console.error('Error fetching tables:', error);
        throw error;
      }

      return data;
    }
  });
}