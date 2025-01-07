import { User, AuthError } from '@supabase/supabase-js';
import { Profile } from '@/types/profile';
import { UserRole, UserStatus } from '@/types/user';

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  status: UserStatus | null;
  isLoading: boolean;
  error: AuthError | null;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setRole: (role: UserRole | null) => void;
  setStatus: (status: UserStatus | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: AuthError | null) => void;
  clearError: () => void;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  loadUserProfile: () => Promise<void>;
  subscribeToUpdates: () => () => void;
}

export type AuthStore = AuthState & AuthActions;