import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { checkUserRole } from '@/utils/roles';

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

  setUser: async (user) => {
    console.log('Setting user:', user);
    set({ user });
    if (user) {
      const isAdmin = await checkUserRole(user.id, 'admin');
      console.log('Admin status check result:', isAdmin);
      set({ isAdmin });
    } else {
      set({ isAdmin: false });
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
      const isAdmin = await checkUserRole(userId, 'admin');
      console.log('Admin status result:', isAdmin);
      set({ isAdmin });
    } catch (err) {
      console.error('Error checking admin status:', err);
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