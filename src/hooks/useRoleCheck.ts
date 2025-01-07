import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useRoleCheck = (user: User | null, requiredRole: string) => {
  const [hasRole, setHasRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setHasRole(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setHasRole(data?.role === requiredRole);
      } catch (err) {
        console.error('Error checking role:', err);
        setHasRole(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkRole();
  }, [user, requiredRole]);

  return { hasRole, isLoading };
};