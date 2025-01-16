import { create } from 'zustand';
import { User, Session, AuthError, AuthApiError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setError: (error: Error | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  
  signOut: () => Promise<void>;
  clearState: () => void;
  refreshSession: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),

  clearState: () => {
    set({
      user: null,
      session: null,
      isLoading: false,
      error: null
    });
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem('supabase.auth.token');
      
      // Reset store state
      get().clearState();
      
    } catch (error) {
      console.error('Error signing out:', error);
      set({ error: error as Error });
      throw error;
    }
  },

  refreshSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      set({ 
        session,
        user: session?.user ?? null,
        error: null
      });
    } catch (error) {
      console.error('Error refreshing session:', error);
      if (error instanceof AuthApiError && error.status === 401) {
        get().clearState();
      }
      set({ error: error as Error });
    }
  },

  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        set({
          session,
          user: session.user,
          error: null
        });
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session);
          
          switch (event) {
            case 'SIGNED_IN':
              set({
                session,
                user: session?.user ?? null,
                error: null
              });
              break;
              
            case 'SIGNED_OUT':
              get().clearState();
              break;
              
            case 'TOKEN_REFRESHED':
              set({ session });
              break;
              
            case 'USER_UPDATED':
              set({ user: session?.user ?? null });
              break;
          }
        }
      );

      // Cleanup function will be called by components using this
      return () => {
        subscription.unsubscribe();
      };
      
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ error: error as Error });
      get().clearState();
    } finally {
      set({ isLoading: false });
    }
  }
}));