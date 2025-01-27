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
        isAdmin: false,
        error: null,
      });
    } catch (error) {
      set({ error: error as Error });
      throw error;
    }
  },

  initialize: async () => {
    if (get().initialized) return;

    set({ isLoading: true });
    try {
      // Get the current session
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roleError) throw roleError;

        set({
          user: session.user,
          session,
          isAdmin: roleData?.role === 'admin',
        });
      }

      // Listen for auth state changes
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          get().setSession(session);
          get().setUser(session.user);
          console.log('User signed in:', session.user);

          // Check if the user is admin
          supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single()
            .then(({ data, error }) => {
              if (!error && data) {
                set({ isAdmin: data.role === 'admin' });
              }
            });
        } else if (event === 'SIGNED_OUT') {
          set({
            user: null,
            session: null,
            isAdmin: false,
          });
          console.log('User signed out');
        }
      });

      set({ initialized: true });
    } catch (error) {
      set({
        error: error as Error,
        user: null,
        session: null,
        isAdmin: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
