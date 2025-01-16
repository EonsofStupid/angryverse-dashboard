import { create } from 'zustand';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
  isAdmin: boolean;
  
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
  isAdmin: false,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ 
        user: null, 
        session: null, 
        error: null,
        isAdmin: false 
      });
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
      
      // Get initial session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session) {
        // Check admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roleError) {
          console.error('Error checking role:', roleError);
        }

        set({
          session,
          user: session.user,
          isAdmin: roleData?.role === 'admin',
          error: null
        });
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (session) {
          // Check admin role on auth state change
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          set({
            session,
            user: session.user,
            isAdmin: roleData?.role === 'admin',
            error: null
          });
        } else {
          set({
            session: null,
            user: null,
            isAdmin: false,
            error: null
          });
        }
      });

      set({ initialized: true, isLoading: false });
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
      
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ 
        error: error as Error,
        user: null,
        session: null,
        isAdmin: false,
        isLoading: false,
        initialized: true
      });
    }
  }
}));