import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useRoleCheck = (user: User | null, requiredRole: string) => {
  const [hasRole, setHasRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        console.log('No user to check role for');
        setHasRole(false);
        setIsLoading(false);
        return;
      }

      try {
        console.log(`Checking if user ${user.id} has role ${requiredRole}`);
        
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', requiredRole)
          .single();

        if (error) throw error;

        const roleExists = !!data;
        console.log('Role check result:', {
          userId: user.id,
          role: requiredRole,
          hasRole: roleExists
        });

        setHasRole(roleExists);
      } catch (err) {
        console.error('Error checking role:', err);
        setError(err instanceof Error ? err : new Error('Failed to check role'));
        setHasRole(false);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    checkRole();
  }, [user, requiredRole]);

  return { hasRole, isLoading, error };
};