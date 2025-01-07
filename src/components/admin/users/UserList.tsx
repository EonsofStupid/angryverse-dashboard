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
import { Loader2 } from "lucide-react";

export const UserList = () => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      console.log('Fetching users data...');
      
      // Get profiles with roles
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
          updated_at,
          user_roles!inner (
            role,
            status
          )
        `);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast.error('Error fetching user profiles');
        throw profilesError;
      }

      // Transform the data
      const transformedUsers = profiles.map((profile: any) => {
        const userRole = profile.user_roles?.[0];
        return {
          id: profile.id,
          email: '', // We'll get this from admin_user_details
          role: (userRole?.role || 'user') as UserRole,
          status: (userRole?.status || 'active') as UserStatus,
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

      // Get admin user details for emails
      const { data: adminDetails, error: adminError } = await supabase
        .from('admin_user_details')
        .select('id, email');

      if (adminError) {
        console.error('Error fetching admin details:', adminError);
        toast.error('Error fetching user emails');
        throw adminError;
      }

      // Merge email information
      return transformedUsers.map(user => ({
        ...user,
        email: adminDetails?.find(d => d.id === user.id)?.email || ''
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
    console.log('Opening quick edit for user:', user);
    setEditingUser(user);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-admin-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="admin-glass">
        <CardContent className="p-6">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="mb-4 bg-admin-background/50">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-admin-foreground"
              >
                All Users
              </TabsTrigger>
              <TabsTrigger 
                value="active"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-admin-foreground"
              >
                Active Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
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

            <TabsContent value="active" className="space-y-4">
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
    </div>
  );
};