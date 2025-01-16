import { create } from 'zustand';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
  
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setError: (error: Error | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  initialized: false,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, session: null, error: null });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ error: error as Error });
      throw error;
    }
  },

  initialize: async () => {
    const state = get();
    if (state.initialized) return;

    try {
      set({ isLoading: true });
      
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        set({
          session,
          user: session.user,
          error: null
        });
      }

      set({ initialized: true, isLoading: false });
      
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ 
        error: error as Error,
        user: null,
        session: null,
        isLoading: false,
        initialized: true
      });
    }
  }
}));