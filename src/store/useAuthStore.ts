import { create } from "zustand";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

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

  // This signIn method is optional, but recommended to keep everything in one place.
  signIn: (email: string, password: string) => Promise<Error | null>;

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
    set({ user });
  },

  setSession: (session) => {
    set({ session });
  },

  setError: (error) => {
    set({ error });
  },

  setIsLoading: (isLoading) => {
    set({ isLoading });
  },

  // 1) Single store signIn
  signIn: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { user } = data;
      if (!user) throw new Error("No user returned from signInWithPassword.");

      // If you store roles in a table:
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      const role = roleData?.role || null;
      set({
        user,
        session: (await supabase.auth.getSession()).data.session,
        isAdmin: role === "admin",
        userRole: role,
        isLoading: false,
        error: null,
      });
      return null;
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error("Sign-in failed");
      set({ error: errorObj, isLoading: false });
      return errorObj;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        user: null,
        session: null,
        error: null,
        isAdmin: false,
        userRole: null,
      });
    } catch (err) {
      set({ error: err as Error });
      throw err;
    }
  },

  initialize: async () => {
    const state = get();
    if (state.initialized) return;

    try {
      set({ isLoading: true });

      // Check existing session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session) {
        // If you store roles in DB:
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        const role = !roleError && roleData?.role ? roleData.role : null;
        set({
          session,
          user: session.user,
          isAdmin: role === "admin",
          userRole: role,
          error: null,
        });
      } else {
        set({
          session: null,
          user: null,
          isAdmin: false,
          userRole: null,
          error: null,
        });
      }

      // Subscribe to changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .single();

          const role = roleData?.role || null;
          set({
            user: session.user,
            session,
            isAdmin: role === "admin",
            userRole: role,
            error: null,
            isLoading: false,
          });
        } else if (event === "SIGNED_OUT") {
          set({
            user: null,
            session: null,
            isAdmin: false,
            userRole: null,
            error: null,
            isLoading: false,
          });
        }
      });

      window.addEventListener("beforeunload", () => {
        subscription.unsubscribe();
      });

      set({ initialized: true, isLoading: false });
    } catch (error) {
      set({
        error: error as Error,
        user: null,
        session: null,
        isAdmin: false,
        userRole: null,
        isLoading: false,
        initialized: true,
      });
    }
  },
}));
