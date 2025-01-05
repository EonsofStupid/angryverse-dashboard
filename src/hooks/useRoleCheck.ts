import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { UserRole, checkUserRole } from "@/utils/roles";

export const useRoleCheck = (user: User | null, requiredRole: UserRole) => {
  const { data: hasRole = false, isLoading } = useQuery({
    queryKey: ['role-check', user?.id, requiredRole],
    queryFn: async () => {
      if (!user) return false;
      return checkUserRole(user.id, requiredRole);
    },
    enabled: !!user,
  });

  return { hasRole, isLoading };
};