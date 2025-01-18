import { create } from 'zustand';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
  
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setError: (error: Error | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
  clearState: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isAdmin: false,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
  
  clearState: () => {
    set({
      user: null,
      session: null,
      error: null,
      isAdmin: false,
      isLoading: false
    });
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      get().clearState();
      localStorage.removeItem('supabase.auth.token');
    } catch (error) {
      console.error('Error in signOut:', error);
      set({ error: error as Error });
      throw error;
    }
  },

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session?.user) {
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
      } else {
        get().clearState();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ 
        error: error as Error,
        isLoading: false 
      });
    } finally {
      set({ isLoading: false });
    }
  }
}));

// Single auth state change listener
supabase.auth.onAuthStateChange(async (event, session) => {
  const store = useAuthStore.getState();
  
  console.log('Auth state changed:', event, session?.user?.id);
  
  if (event === 'SIGNED_IN') {
    await store.initialize();
  } else if (event === 'SIGNED_OUT') {
    store.clearState();
  } else if (event === 'USER_UPDATED') {
    if (session) {
      store.setUser(session.user);
      store.setSession(session);
    }
  }
});