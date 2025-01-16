import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useRoleCheck = (user: User | null, requiredRole: string) => {
  const [hasRole, setHasRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      if (!user) {
        if (isMounted) {
          setHasRole(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking role:', error);
          if (isMounted) {
            setHasRole(false);
          }
          return;
        }

        if (isMounted) {
          setHasRole(data?.role === requiredRole);
        }
      } catch (err) {
        console.error('Error in role check:', err);
        if (isMounted) {
          setHasRole(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [user, requiredRole]);

  return { hasRole, isLoading };
};