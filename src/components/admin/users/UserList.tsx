import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { UserFilter } from "./UserFilter";
import { UserActions } from "./UserActions";
import { UserStatus, User, UserRole } from "@/types/user";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserListContent } from "./UserListContent";
import { QuickEditModal } from "./QuickEditModal";

interface ProfileWithRoles {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  last_active: string | null;
  display_name: string | null;
  updated_at: string | null;
}

export const UserList = () => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // First, get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          avatar_url,
          bio,
          location,
          website,
          last_active,
          display_name,
          updated_at
        `) as { data: ProfileWithRoles[] | null, error: any };

      if (profilesError) {
        toast.error('Error fetching users');
        throw profilesError;
      }

      // Then, get user roles for each profile
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        toast.error('Error fetching user roles');
        throw rolesError;
      }

      // Create a map of user_id to role
      const userRoles = new Map<string, UserRole>();
      roles?.forEach(role => {
        userRoles.set(role.user_id, role.role as UserRole);
      });

      // Transform the data to match our User type
      return (profiles || []).map(profile => ({
        id: profile.id,
        email: profile.username || 'No username',
        role: userRoles.get(profile.id) || 'user' as UserRole,
        status: 'active' as UserStatus,
        profile: {
          id: profile.id,
          username: profile.username,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          last_active: profile.last_active,
          updated_at: profile.updated_at
        }
      }));
    }
  });

  const filteredUsers = users?.filter(user => {
    if (activeTab === "active") {
      return user.status === "active";
    }
    return true;
  }).filter(user => 
    selectedStatus === 'all' ? true : user.status === selectedStatus
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked && filteredUsers) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleQuickEdit = (user: User) => {
    setEditingUser(user);
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active Users</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <UserFilter
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
            
            {selectedUsers.length > 0 && (
              <UserActions
                selectedUsers={selectedUsers}
                onActionComplete={() => setSelectedUsers([])}
              />
            )}
            
            <UserListContent
              users={filteredUsers || []}
              selectedUsers={selectedUsers}
              onSelectUser={handleSelectUser}
              onSelectAll={handleSelectAll}
              onQuickEdit={handleQuickEdit}
            />
          </TabsContent>

          <TabsContent value="active">
            <UserListContent
              users={filteredUsers || []}
              selectedUsers={selectedUsers}
              onSelectUser={handleSelectUser}
              onSelectAll={handleSelectAll}
              onQuickEdit={handleQuickEdit}
            />
          </TabsContent>
        </Tabs>

        <QuickEditModal
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
        />
      </CardContent>
    </Card>
  );
};
