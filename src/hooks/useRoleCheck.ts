import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useRoleCheck = (user: User | null, requiredRole: string) => {
  const [hasRole, setHasRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      console.log('Role Check: Starting role check for user', { 
        userId: user?.id, 
        requiredRole 
      });

      if (!user) {
        console.log('Role Check: No user provided, setting hasRole to false');
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
          console.error('Role Check: Error checking role:', error);
          if (isMounted) {
            setHasRole(false);
          }
          return;
        }

        const roleMatches = data?.role === requiredRole;
        console.log('Role Check: Role verification result', { 
          userRole: data?.role,
          requiredRole,
          hasRole: roleMatches
        });

        if (isMounted) {
          setHasRole(roleMatches);
        }
      } catch (err) {
        console.error('Role Check: Error in role check:', err);
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