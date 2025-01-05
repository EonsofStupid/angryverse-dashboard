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
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        set({ isAdmin: false });
        return;
      }

      set({ isAdmin: data?.role === 'admin' });
    } catch (error) {
      console.error('Error checking admin status:', error);
      set({ isAdmin: false });
    }
  },
  signOut: async () => {
    try {
      console.log('Starting signOut process...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Successfully signed out from Supabase');
      set({ user: null, isAdmin: false });
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  },
}));