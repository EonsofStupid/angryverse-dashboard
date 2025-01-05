import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  checkAdminStatus: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsLoading: (isLoading) => set({ isLoading }),
  checkAdminStatus: async (userId) => {
    try {
      console.log('=== Starting Admin Status Check ===');
      console.log('Checking admin status for userId:', userId);

      // First, let's verify the user_roles table structure
      const { data: tableInfo, error: tableError } = await supabase
        .from('user_roles')
        .select('*')
        .limit(1);
      
      console.log('Table structure check:', { tableInfo, tableError });

      // Now query for this specific user's role
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      console.log('Raw query response:', { data, error });

      if (error) {
        console.error('Database query error:', error);
        set({ isAdmin: false });
        console.log('Setting isAdmin to false due to error');
        return;
      }

      if (!data || data.length === 0) {
        console.log('No role data found for user');
        set({ isAdmin: false });
        console.log('Setting isAdmin to false due to no data');
        return;
      }

      console.log('Role data found:', data);
      const userRole = data[0];
      console.log('User role object:', userRole);
      
      const isAdmin = userRole.role === 'admin';
      console.log('Role value:', userRole.role);
      console.log('Calculated isAdmin status:', isAdmin);
      
      set({ isAdmin });
      console.log('Updated store with isAdmin:', isAdmin);
      console.log('=== Admin Status Check Complete ===');
    } catch (err) {
      console.error('Unexpected error in checkAdminStatus:', err);
      set({ isAdmin: false });
      console.log('Setting isAdmin to false due to unexpected error');
    }
  },
  signOut: async () => {
    try {
      console.log('Starting signOut process...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isAdmin: false, isLoading: false });
      console.log('SignOut successful, store state cleared');
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  },
}));