import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
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
    console.log('Setting user:', user);
    set({ user });
    if (user) {
      get().checkAdminStatus(user.id);
    }
  },

  setIsAdmin: (isAdmin) => {
    console.log('Setting admin status:', isAdmin);
    set({ isAdmin });
  },

  setIsLoading: (isLoading) => set({ isLoading }),

  checkAdminStatus: async (userId) => {
    try {
      console.log('Checking admin status for user:', userId);
      
      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        set({ isAdmin: false });
        return;
      }

      console.log('User roles data:', userRoles);
      
      const isAdmin = userRoles?.role === 'admin';
      console.log('Is admin?', isAdmin);
      
      set({ isAdmin });
    } catch (err) {
      console.error('Unexpected error in checkAdminStatus:', err);
      set({ isAdmin: false });
    }
  },

  signOut: async () => {
    try {
      console.log('Starting sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isAdmin: false });
      console.log('Sign out successful');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
}));