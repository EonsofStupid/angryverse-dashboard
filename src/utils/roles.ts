import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { create } from 'zustand';

export type UserRole = 'admin' | 'user';

export interface RoleCheck {
  hasRole: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const checkUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
  console.log('Checking role for user:', userId, 'role:', role);
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', role)
    .single();

  if (error) {
    console.error('Error checking user role:', error);
    return false;
  }

  return !!data;
};

export const useRoleStore = create<{
  userRoles: Map<string, UserRole[]>;
  setUserRoles: (userId: string, roles: UserRole[]) => void;
  clearUserRoles: () => void;
}>((set) => ({
  userRoles: new Map(),
  setUserRoles: (userId, roles) => 
    set((state) => ({
      userRoles: new Map(state.userRoles).set(userId, roles),
    })),
  clearUserRoles: () => set({ userRoles: new Map() }),
}));

export const fetchUserRoles = async (userId: string): Promise<UserRole[]> => {
  console.log('Fetching roles for user:', userId);
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }

  const roles = data.map(r => r.role as UserRole);
  useRoleStore.getState().setUserRoles(userId, roles);
  return roles;
};

export const hasRole = async (user: User | null, role: UserRole): Promise<boolean> => {
  if (!user) return false;
  
  const storedRoles = useRoleStore.getState().userRoles.get(user.id);
  if (storedRoles) {
    return storedRoles.includes(role);
  }

  const roles = await fetchUserRoles(user.id);
  return roles.includes(role);
};

export const requireRole = (role: UserRole) => {
  return async (user: User | null): Promise<boolean> => {
    const hasRequiredRole = await hasRole(user, role);
    if (!hasRequiredRole) {
      console.warn(`User ${user?.id} does not have required role: ${role}`);
    }
    return hasRequiredRole;
  };
};