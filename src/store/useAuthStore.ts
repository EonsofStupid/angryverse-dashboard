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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  setUser: (user) => {
    console.log('Setting user in store:', user);
    set({ user });
  },
  setIsAdmin: (isAdmin) => {
    console.log('Setting isAdmin in store:', isAdmin);
    set({ isAdmin });
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  checkAdminStatus: async (userId) => {
    try {
      console.log('=== Starting Admin Status Check ===');
      console.log('Checking admin status for userId:', userId);
      
      if (!userId) {
        console.log('No userId provided, setting isAdmin to false');
        set({ isAdmin: false });
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      console.log('Query response:', { data, error });

      if (error) {
        console.error('Error checking admin status:', error);
        if (error.code === 'PGRST116') {
          // No rows returned - user is not an admin
          console.log('No role found for user, setting isAdmin to false');
          set({ isAdmin: false });
          return;
        }
        throw error;
      }

      const isAdmin = data?.role === 'admin';
      console.log('Role from database:', data?.role);
      console.log('Calculated isAdmin status:', isAdmin);
      
      set({ isAdmin });
      console.log('Updated store with isAdmin:', isAdmin);
      console.log('=== Admin Status Check Complete ===');
    } catch (err) {
      console.error('Unexpected error in checkAdminStatus:', err);
      set({ isAdmin: false });
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