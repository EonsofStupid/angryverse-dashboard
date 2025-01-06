import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { UserRole, checkUserRole } from "@/utils/roles";

export const useRoleCheck = (user: User | null, requiredRole: UserRole) => {
  const { data: hasRole = false, isLoading } = useQuery({
    queryKey: ['role-check', user?.id, requiredRole],
    queryFn: async () => {
      if (!user) {
        console.log('No user provided for role check');
        return false;
      }
      console.log(`Checking if user ${user.id} has role ${requiredRole}`);
      const result = await checkUserRole(user.id, requiredRole);
      console.log('Role check result:', { userId: user.id, role: requiredRole, hasRole: result });
      return result;
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1,
  });

  return { hasRole, isLoading };
};