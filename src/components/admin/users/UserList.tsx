import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Ban, UserX, CheckCircle, XCircle } from "lucide-react";
import { UserFilter } from "./UserFilter";
import { UserActions } from "./UserActions";
import { UserStatus, User } from "@/types/user";
import { toast } from "sonner";

export const UserList = () => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // First get all profiles
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
          user_roles (
            role
          )
        `);

      if (profilesError) {
        toast.error('Error fetching users');
        throw profilesError;
      }

      // Transform the data to match our User type
      return profiles.map(profile => ({
        id: profile.id,
        email: profile.username || 'No username', // Using username as fallback since we can't access email
        role: profile.user_roles?.[0]?.role || 'user',
        status: 'active' as UserStatus, // Default status
        profile: {
          username: profile.username,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          last_active: profile.last_active
        }
      }));
    }
  });

  const filteredUsers = users?.filter(user => 
    selectedStatus === 'all' ? true : user.status === selectedStatus
  );

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers?.map(user => user.id) || []);
    } else {
      setSelectedUsers([]);
    }
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <Card>
      <CardContent>
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
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <Checkbox
              checked={selectedUsers.length === filteredUsers?.length}
              onCheckedChange={toggleSelectAll}
            />
          </div>
          
          {filteredUsers?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedUsers([...selectedUsers, user.id]);
                    } else {
                      setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                    }
                  }}
                />
                <div>
                  <p className="font-medium">{user.profile?.display_name || user.profile?.username || 'No username'}</p>
                  {user.profile?.location && (
                    <p className="text-sm text-muted-foreground">{user.profile.location}</p>
                  )}
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{user.role}</Badge>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                >
                  <Shield className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                >
                  {user.status === 'active' ? (
                    <UserX className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  title={user.status === 'banned' ? 'Unban User' : 'Ban User'}
                >
                  {user.status === 'banned' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Ban className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};