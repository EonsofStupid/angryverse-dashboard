import { create } from 'zustand';
import { User, Session, AuthError, Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: Error | null;
  isAdmin: boolean;
}

interface AuthActions {
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setError: (error: Error | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: Provider, redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearState: () => void;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: true,
  isInitialized: false,
  error: null,
  isAdmin: false,
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),

  clearState: () => {
    set({
      ...initialState,
      isLoading: false,
      isInitialized: true,
    });
  },

  initialize: async () => {
    try {
      console.log('Initializing auth store...');
      set({ isLoading: true, error: null });

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      console.log('Session retrieved:', session ? 'exists' : 'none');

      if (session?.user) {
        console.log('Fetching user role for:', session.user.id);
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roleError) {
          console.error('Error fetching user role:', roleError);
          throw roleError;
        }

        console.log('User role retrieved:', roleData?.role);

        set({
          session,
          user: session.user,
          isAdmin: roleData?.role === 'admin',
          error: null,
          isInitialized: true,
        });
      } else {
        get().clearState();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({
        error: error as Error,
        isInitialized: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // -------------------------------
  // NEW SIGN-IN METHODS
  // -------------------------------
  signInWithPassword: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // The `onAuthStateChange` listener will trigger `initialize()`
    } catch (error) {
      console.error('Error signing in with password:', error);
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithOAuth: async (provider: Provider, redirectTo?: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: redirectTo || `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      // The `onAuthStateChange` listener will trigger `initialize()`
    } catch (error) {
      console.error('Error signing in with OAuth:', error);
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  // -------------------------------

  signOut: async () => {
    try {
      console.log('Signing out...');
      set({ isLoading: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Sign out successful');
      get().clearState();
    } catch (error) {
      console.error('Error signing out:', error);
      set({
        error: error as Error,
        isLoading: false,
      });
      throw error; // Re-throw to handle in UI
    }
  },
}));

// Supabase's auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('Auth state changed:', event);
  const store = useAuthStore.getState();

  try {
    switch (event) {
      case 'SIGNED_IN':
        console.log('User signed in, initializing...');
        await store.initialize();
        break;
      case 'SIGNED_OUT':
        console.log('User signed out, clearing state...');
        store.clearState();
        break;
      case 'USER_UPDATED':
        if (session) {
          console.log('User updated, updating session...');
          store.setUser(session.user);
          store.setSession(session);
        }
        break;
      case 'TOKEN_REFRESHED':
        if (session) {
          console.log('Token refreshed, updating session...');
          store.setSession(session);
        }
        break;
    }
  } catch (error) {
    console.error('Error handling auth state change:', error);
    store.setError(error as Error);
  }
});

// Optional convenience hooks
export const useIsAuthenticated = () => {
  const { user, isInitialized, isLoading } = useAuthStore();
  return {
    isAuthenticated: !!user,
    isInitialized,
    isLoading,
  };
};

export const useHasRole = (role: string) => {
  const { isAdmin } = useAuthStore();
  return role === 'admin' ? isAdmin : false;
};
