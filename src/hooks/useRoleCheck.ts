import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole, hasRole } from '@/utils/roles';

export const useRoleCheck = (requiredRole: UserRole) => {
  const { user } = useAuthStore();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      const result = await hasRole(user, requiredRole);
      setHasAccess(result);
      setIsLoading(false);
    };

    checkAccess();
  }, [user, requiredRole]);

  return { hasAccess, isLoading };
};