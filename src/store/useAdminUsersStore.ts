import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, UserStatus } from '@/types/user';

interface AdminUsersState {
  users: User[];
  selectedUsers: string[];
  isLoading: boolean;
  currentFilter: UserStatus | 'all';
  error: string | null;
  
  // Actions
  fetchUsers: () => Promise<void>;
  selectUser: (userId: string) => void;
  deselectUser: (userId: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  updateUserStatus: (userIds: string[], status: UserStatus) => Promise<void>;
  setFilter: (filter: UserStatus | 'all') => void;
}

export const useAdminUsersStore = create<AdminUsersState>((set, get) => ({
  users: [],
  selectedUsers: [],
  isLoading: false,
  currentFilter: 'all',
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: adminUsers, error } = await supabase
        .from('admin_user_overview')
        .select('*');

      if (error) throw error;
      
      // Map the admin overview data to match the User type
      const users: User[] = (adminUsers || []).map(user => ({
        id: user.id,
        email: '', // This will be empty as it's not in the view for security
        role: user.role,
        status: user.user_status as UserStatus,
        profile: {
          username: user.username,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
          last_active: user.last_active,
        }
      }));
      
      set({ users });
      console.log('Fetched users:', users);
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ error: 'Failed to fetch users' });
      toast.error('Failed to fetch users');
    } finally {
      set({ isLoading: false });
    }
  },

  selectUser: (userId: string) => {
    set((state) => ({
      selectedUsers: [...state.selectedUsers, userId]
    }));
  },

  deselectUser: (userId: string) => {
    set((state) => ({
      selectedUsers: state.selectedUsers.filter(id => id !== userId)
    }));
  },

  selectAll: () => {
    const { users } = get();
    set({ selectedUsers: users.map(user => user.id) });
  },

  deselectAll: () => {
    set({ selectedUsers: [] });
  },

  updateUserStatus: async (userIds: string[], status: UserStatus) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ status })
        .in('user_id', userIds);

      if (error) throw error;

      // Log the action
      await supabase.from('user_activity_logs').insert(
        userIds.map(userId => ({
          user_id: userId,
          action_type: `status_update`,
          action_details: { status, timestamp: new Date().toISOString() }
        }))
      );

      await get().fetchUsers();
      toast.success(`Successfully updated ${userIds.length} user(s)`);
    } catch (error) {
      console.error('Error updating user status:', error);
      set({ error: 'Failed to update user status' });
      toast.error('Failed to update user status');
    } finally {
      set({ isLoading: false });
    }
  },

  setFilter: (filter: UserStatus | 'all') => {
    set({ currentFilter: filter });
  },
}));