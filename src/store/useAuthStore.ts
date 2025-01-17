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
      console.log('Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      console.log('Successfully signed out');
      set({ 
        user: null, 
        session: null, 
        error: null,
        isAdmin: false 
      });
    } catch (error) {
      console.error('Error in signOut:', error);
      set({ error: error as Error });
      throw error;
    }
  },

  initialize: async () => {
    const state = get();
    if (state.initialized) {
      console.log('Auth already initialized');
      return;
    }

    try {
      console.log('Initializing auth...');
      set({ isLoading: true });
      
      // Get initial session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw sessionError;
      }

      if (session) {
        console.log('Found existing session:', session.user.id);
        // Check admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roleError) {
          console.error('Error checking role:', roleError);
        }

        const isAdmin = roleData?.role === 'admin';
        console.log('User admin status:', isAdmin);

        set({
          session,
          user: session.user,
          isAdmin,
          error: null
        });
      } else {
        console.log('No existing session found');
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (session) {
          // Check admin role on auth state change
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (roleError) {
            console.error('Error checking role on auth change:', roleError);
          }

          const isAdmin = roleData?.role === 'admin';
          console.log('Updated user admin status:', isAdmin);

          set({
            session,
            user: session.user,
            isAdmin,
            error: null
          });
        } else {
          console.log('Session cleared');
          set({
            session: null,
            user: null,
            isAdmin: false,
            error: null
          });
        }
      });

      set({ initialized: true, isLoading: false });
      console.log('Auth initialization complete');
      
      // Cleanup function
      const cleanup = () => {
        console.log('Cleaning up auth subscription');
        subscription.unsubscribe();
      };
      
      window.addEventListener('unload', cleanup);
      
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