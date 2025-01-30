import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
  isAdmin: boolean;
  userRole: string | null;
  
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
  userRole: null,

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
      if (error) throw error;
      
      set({ 
        user: null, 
        session: null, 
        error: null,
        isAdmin: false,
        userRole: null
      });
      console.log('Auth Store: Successfully signed out');
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
      set({ isLoading: true });
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session) {
        console.log('Auth Store: Found existing session:', { 
          userId: session.user.id,
          email: session.user.email 
        });

        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roleError) {
          console.error('Auth Store: Error checking role:', roleError);
        }

        const isAdmin = roleData?.role === 'admin';
        console.log('Auth Store: User admin status:', { isAdmin, roleData });

        set({
          session,
          user: session.user,
          isAdmin,
          userRole: roleData?.role || null,
          error: null
        });
      } else {
        console.log('Auth Store: No existing session found');
        set({
          session: null,
          user: null,
          isAdmin: false,
          userRole: null,
          error: null
        });
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth Store: Auth state changed:', event, session?.user?.id);
          
          if (event === 'SIGNED_IN' && session) {
            const { data: roleData } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .single();

            set({
              user: session.user,
              session,
              isAdmin: roleData?.role === 'admin',
              userRole: roleData?.role || null,
              error: null,
              isLoading: false
            });
          } else if (event === 'SIGNED_OUT') {
            set({
              user: null,
              session: null,
              isAdmin: false,
              userRole: null,
              error: null,
              isLoading: false
            });
          }
        }
      );

      window.addEventListener('beforeunload', () => {
        subscription.unsubscribe();
      });

      set({ initialized: true, isLoading: false });
      console.log('Auth Store: Initialization complete');
      
    } catch (error) {
      console.error('Auth Store: Error initializing auth:', error);
      set({ 
        error: error as Error,
        user: null,
        session: null,
        isAdmin: false,
        userRole: null,
        isLoading: false,
        initialized: true
      });
    }
  }
}));