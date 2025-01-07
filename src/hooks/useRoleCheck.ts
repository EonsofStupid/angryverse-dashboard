import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/types/user';

export const useRoleCheck = (user: User | null, requiredRole: UserRole) => {
  const { role: currentRole } = useAuthStore();
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
        // First check the store
        if (currentRole) {
          setHasRole(currentRole === requiredRole);
          setIsLoading(false);
          return;
        }

        // Fallback to database check
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
  }, [user, requiredRole, currentRole]);

  return { hasRole, isLoading };
};