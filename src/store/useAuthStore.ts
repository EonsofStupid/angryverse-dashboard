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

  setUser: (user) => {
    console.log('Auth Store: Setting user', { userId: user?.id });
    set({ user });
  },
  setSession: (session) => {
    console.log('Auth Store: Setting session', { sessionId: session?.access_token });
    set({ session });
  },
  setError: (error) => {
    console.error('Auth Store: Error occurred', error);
    set({ error });
  },
  setIsLoading: (isLoading) => {
    console.log('Auth Store: Loading state changed', { isLoading });
    set({ isLoading });
  },

  signOut: async () => {
    try {
      console.log('Auth Store: Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Auth Store: Error signing out:', error);
        throw error;
      }
      console.log('Auth Store: Successfully signed out');
      set({ 
        user: null, 
        session: null, 
        error: null,
        isAdmin: false 
      });
    } catch (error) {
      console.error('Auth Store: Error in signOut:', error);
      set({ error: error as Error });
      throw error;
    }
  },

  initialize: async () => {
    const state = get();
    if (state.initialized) {
      console.log('Auth Store: Already initialized');
      return;
    }

    try {
      console.log('Auth Store: Initializing...');
      set({ isLoading: true, initialized: true });
      
      // Setup auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            // Check admin role
            const { data: roleData } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .single();

            set({
              session,
              user: session.user,
              isAdmin: roleData?.role === 'admin' ?? false,
              isLoading: false,
              error: null
            });
          } else {
            set({
              session: null,
              user: null,
              isAdmin: false,
              isLoading: false,
              error: null
            });
          }
        }
      );

      // Get initial session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        set({
          session,
          user: session.user,
          isAdmin: roleData?.role === 'admin' ?? false,
          isLoading: false,
          error: null
        });
      } else {
        set({
          session: null,
          user: null,
          isAdmin: false,
          isLoading: false,
          error: null
        });
      }
      
    } catch (error) {
      console.error('Auth Store: Error initializing auth:', error);
      set({ 
        error: error as Error,
        user: null,
        session: null,
        isAdmin: false,
        isLoading: false
      });
    }
  }
}));