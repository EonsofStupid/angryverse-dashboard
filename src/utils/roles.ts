import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { create } from 'zustand';

export type UserRole = 'admin' | 'user';

interface RoleState {
  userRoles: Map<string, UserRole[]>;
  setUserRoles: (userId: string, roles: UserRole[]) => void;
  clearUserRoles: () => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  userRoles: new Map(),
  setUserRoles: (userId, roles) => 
    set((state) => ({
      userRoles: new Map(state.userRoles).set(userId, roles),
    })),
  clearUserRoles: () => set({ userRoles: new Map() }),
}));

export const checkUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
  console.log('Checking role for user:', userId, 'role:', role);
  
  // Check cache first
  const cachedRoles = useRoleStore.getState().userRoles.get(userId);
  if (cachedRoles) {
    return cachedRoles.includes(role);
  }

  // If not in cache, fetch from database
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

  // Cache the result
  useRoleStore.getState().setUserRoles(userId, [data.role]);
  return !!data;
};

export const hasRole = async (user: User | null, role: UserRole): Promise<boolean> => {
  if (!user) return false;
  return checkUserRole(user.id, role);
};