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
      console.log('Starting admin status check for user:', userId);

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      console.log('Query response:', { data, error });

      if (error) {
        console.error('Error fetching role:', error);
        set({ isAdmin: false });
        return;
      }

      const isAdmin = data?.role === 'admin';
      console.log('User role:', data?.role);
      console.log('Setting isAdmin to:', isAdmin);
      
      set({ isAdmin });
    } catch (err) {
      console.error('Unexpected error:', err);
      set({ isAdmin: false });
    }
  },
  signOut: async () => {
    try {
      console.log('Starting signOut process in auth store...');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase signOut error:', error);
        throw error;
      }
      
      console.log('Supabase signOut successful');
      set({ user: null, isAdmin: false, isLoading: false });
      console.log('Store state cleared');
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  },
}));