import { StateCreator } from 'zustand';
import { AuthStore, AuthState } from './types';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/profile';

export const createAuthActions = (
  set: StateCreator<AuthStore>['setState'],
  get: () => AuthStore
) => ({
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setRole: (role) => set({ role }),
  setStatus: (status) => set({ status }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  signOut: async () => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ 
        user: null, 
        profile: null,
        role: null,
        status: null 
      });
    } catch (error: any) {
      set({ error });
      console.error('Error signing out:', error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshSession: async () => {
    try {
      set({ isLoading: true });
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (session?.user) {
        set({ user: session.user });
        await get().loadUserProfile();
      }
    } catch (error: any) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  loadUserProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      // Load profile using maybeSingle to prevent body stream errors
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (profileError) throw profileError;
      if (profile) set({ profile });

      // Load role using maybeSingle
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role, status')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (roleError) throw roleError;
      
      if (roleData) {
        set({ 
          role: roleData.role ?? 'user',
          status: roleData.status ?? 'active'
        });
      }

    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  },

  subscribeToUpdates: () => {
    const { user } = get();
    if (!user) return () => {};

    // Profile changes subscription
    const profileSubscription = supabase
      .channel('profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        async (payload) => {
          if (payload.new) {
            set({ profile: payload.new as Profile });
          }
        }
      )
      .subscribe();

    // Role changes subscription
    const roleSubscription = supabase
      .channel('role_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_roles',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          if (payload.new) {
            set({ 
              role: payload.new.role,
              status: payload.new.status
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileSubscription);
      supabase.removeChannel(roleSubscription);
    };
  }
});