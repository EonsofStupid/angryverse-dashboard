import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsLoading: (isLoading) => set({ isLoading }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAdmin: false });
  },
}));