import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { UserFilter } from "./UserFilter";
import { UserActions } from "./UserActions";
import { UserStatus, User, UserRole } from "@/types/user";
import { Profile } from "@/types/profile";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserListContent } from "./UserListContent";
import { QuickEditModal } from "./QuickEditModal";

export const UserList = () => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      console.log('Fetching users data...');
      
      // Get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          display_name,
          avatar_url,
          bio,
          location,
          website,
          last_active,
          updated_at
        `);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast.error('Error fetching user profiles');
        throw profilesError;
      }

      // Get user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, status');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        toast.error('Error fetching user roles');
        throw rolesError;
      }

      // Transform and combine the data
      const transformedUsers = profiles.map((profile) => {
        const userRole = userRoles.find(r => r.user_id === profile.id);
        
        // Ensure status is a valid UserStatus
        let status: UserStatus = 'active'; // Default value
        if (userRole?.status === 'suspended' || userRole?.status === 'banned') {
          status = userRole.status;
        }
        
        return {
          id: profile.id,
          email: '', // We can't get emails directly, but that's okay for the list view
          role: (userRole?.role || 'user') as UserRole,
          status,
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
        };
      });

      console.log('Combined users data:', transformedUsers);
      return transformedUsers;
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
    console.log('Opening quick edit for user:', user);
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