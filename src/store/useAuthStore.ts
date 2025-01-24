import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: string | null; // Storing the user's role (e.g. 'admin', 'user', etc.)
  isLoading: boolean;
  error: Error | null;
  initialized: boolean; // So we only run init once

  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  role: null,
  isLoading: true,
  error: null,
  initialized: false,

  /**
   * Attempt to get the current session and set up the onAuthStateChange listener.
   * Only runs once due to the `initialized` guard.
   */
  initialize: async () => {
    if (get().initialized) {
      return; // Already initialized
    }

    try {
      set({ isLoading: true });

      // 1. Get existing session from Supabase
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      // 2. Update store with session & user
      set({
        session,
        user: session?.user ?? null,
      });

      // 3. Fetch role if user exists
      if (session?.user) {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        if (roleError) {
          console.error('Error fetching role:', roleError);
        }
        set({ role: roleData?.role ?? null });
      }

      // 4. Listen for future auth state changes
      supabase.auth.onAuthStateChange(async (_event, newSession) => {
        // Any auth change => set isLoading while we refetch role or clear data
        set({ isLoading: true });

        set({
          session: newSession,
          user: newSession?.user ?? null,
        });

        // If we have a new user, refetch role
        if (newSession?.user) {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', newSession.user.id)
            .single();
          if (roleError) {
            console.error('Error fetching role:', roleError);
          }
          set({ role: roleData?.role ?? null });
        } else {
          // No user => no role
          set({ role: null });
        }

        // Done re-fetching or clearing user/role
        set({ isLoading: false });
      });
    } catch (error) {
      console.error('AuthStore Error:', error);
      set({ error: error as Error });
    } finally {
      // Mark as initialized and remove loading state
      set({ initialized: true, isLoading: false });
    }
  },

  /**
   * Signs out the user via Supabase, then clears local store state.
   */
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({
        user: null,
        session: null,
        role: null,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ error: error as Error });
    }
  },
}));