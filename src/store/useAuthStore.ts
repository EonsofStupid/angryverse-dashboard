import { create } from 'zustand';
import { User, AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/profile';
import { UserRole, UserStatus } from '@/types/user';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  status: UserStatus | null;
  isLoading: boolean;
  error: AuthError | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setRole: (role: UserRole | null) => void;
  setStatus: (status: UserStatus | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: AuthError | null) => void;
  clearError: () => void;
  
  // Auth operations
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  loadUserProfile: () => Promise<void>;
  subscribeToUpdates: () => () => void;
}

interface UserRoleRecord {
  role: UserRole;
  status: UserStatus;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  role: null,
  status: null,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
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
        session: null, 
        profile: null,
        role: null,
        status: null 
      });
    } catch (error) {
      if (error instanceof AuthError) {
        set({ error });
        console.error('Error signing out:', error.message);
      }
      throw error;
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
        set({ session, user: session.user });
        await get().loadUserProfile();
      }
    } catch (error) {
      if (error instanceof AuthError) {
        set({ error });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  loadUserProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      // Load profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileError) throw profileError;
      set({ profile });

      // Load role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role, status')
        .eq('user_id', user.id)
        .single<UserRoleRecord>();
      
      if (roleError) throw roleError;
      
      if (roleData) {
        const defaultRole: UserRole = 'user';
        const defaultStatus: UserStatus = 'active';
        
        set({ 
          role: roleData.role ?? defaultRole,
          status: roleData.status ?? defaultStatus
        });
      }

      // Log security event
      await supabase.rpc('log_auth_event', {
        p_user_id: user.id,
        p_event_type: 'profile_loaded',
        p_ip_address: '',
        p_user_agent: navigator.userAgent,
        p_metadata: { timestamp: new Date().toISOString() }
      });

    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  },

  subscribeToUpdates: () => {
    const { user } = get();
    if (!user) return () => {};

    // Subscribe to profile changes
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

    // Subscribe to role changes
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
            const roleData = payload.new as UserRoleRecord;
            set({ 
              role: roleData.role,
              status: roleData.status
            });
          }
        }
      )
      .subscribe();

    // Return cleanup function
    return () => {
      supabase.removeChannel(profileSubscription);
      supabase.removeChannel(roleSubscription);
    };
  }
}));