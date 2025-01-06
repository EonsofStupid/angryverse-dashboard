import { supabase } from "@/integrations/supabase/client";

export type UserRole = 'admin' | 'user';

export const checkUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
  console.log(`Checking if user ${userId} has role ${role}`);
  
  try {
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

    const hasRole = !!data;
    console.log('Role check result:', { userId, role, hasRole });
    return hasRole;
  } catch (error) {
    console.error('Error in checkUserRole:', error);
    return false;
  }
};