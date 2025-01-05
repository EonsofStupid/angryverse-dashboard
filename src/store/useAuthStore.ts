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

      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      console.log('Query response:', { userRoles, error });

      if (error) {
        console.error('Error checking admin status:', error);
        throw error;
      }

      // Check if any of the user's roles is 'admin'
      const isAdmin = userRoles?.some(role => role.role === 'admin') ?? false;
      console.log('User roles from database:', userRoles);
      console.log('Setting isAdmin to:', isAdmin);
      
      set({ isAdmin });
      
      // Double check the state was updated
      const currentState = get();
      console.log('Current state after update:', {
        isAdmin: currentState.isAdmin,
        userId: currentState.user?.id,
        roles: userRoles
      });
      
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