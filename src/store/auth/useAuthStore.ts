import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthState, AuthStore } from './types';
import { createAuthActions } from './actions';

const initialState: AuthState = {
  user: null,
  profile: null,
  role: null,
  status: null,
  isLoading: true,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        ...createAuthActions(set, get),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          session: state.session
        })
      }
    )
  )
);