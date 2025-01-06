import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Cache for role check results
const roleCache = new Map<string, Set<string>>();

export const useRoleCheck = (user: User | null, requiredRole: string) => {
  const [hasRole, setHasRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCacheKey = useCallback((userId: string) => `${userId}`, []);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setHasRole(false);
        setIsLoading(false);
        return;
      }

      const cacheKey = getCacheKey(user.id);
      
      // Check cache first
      if (roleCache.has(cacheKey)) {
        const userRoles = roleCache.get(cacheKey);
        if (userRoles) {
          setHasRole(userRoles.has(requiredRole));
          setIsLoading(false);
          return;
        }
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        const roleExists = data?.role === requiredRole;
        
        // Update cache
        const userRoles = new Set([data?.role]);
        roleCache.set(cacheKey, userRoles);
        
        setHasRole(roleExists);
      } catch (err) {
        console.error('Error checking role:', err);
        setHasRole(false);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    checkRole();
  }, [user, requiredRole, getCacheKey]);

  return { hasRole, isLoading };
};