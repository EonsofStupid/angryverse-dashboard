import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, Ban, UserX, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserStatus = 'active' | 'suspended' | 'banned';
type UserRole = 'user' | 'admin';

interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profile?: {
    username: string | null;
    avatar_url: string | null;
  };
}

export const UserManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        throw rolesError;
      }

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      return users.users.map(user => {
        const userRole = userRoles?.find(role => role.user_id === user.id);
        const profile = profiles?.find(profile => profile.id === user.id);
        return {
          id: user.id,
          email: user.email || 'No email',
          role: userRole?.role || 'user',
          status: 'active' as UserStatus,
          profile
        };
      });
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string, newRole: UserRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: newRole 
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update user role");
      console.error('Error updating role:', error);
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ userId, newStatus }: { userId: string, newStatus: UserStatus }) => {
      // In a real app, you'd update the user's status in your database
      toast.success(`User status updated to ${newStatus}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const bulkActionMutation = useMutation({
    mutationFn: async ({ action, userIds }: { action: string, userIds: string[] }) => {
      switch (action) {
        case 'delete':
          // In a real app, you'd implement bulk deletion
          toast.success(`${userIds.length} users deleted`);
          break;
        case 'suspend':
          // In a real app, you'd implement bulk suspension
          toast.success(`${userIds.length} users suspended`);
          break;
        default:
          throw new Error('Invalid action');
      }
    },
    onSuccess: () => {
      setSelectedUsers([]);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error("Please select users first");
      return;
    }
    bulkActionMutation.mutate({ action, userIds: selectedUsers });
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers?.map(user => user.id) || []);
    } else {
      setSelectedUsers([]);
    }
  };

  const filteredUsers = users?.filter(user => 
    selectedStatus === 'all' ? true : user.status === selectedStatus
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Users</span>
          <div className="flex gap-2">
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as UserStatus | 'all')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedUsers.length > 0 && (
          <div className="mb-4 p-2 bg-muted rounded-lg flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleBulkAction('delete')}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleBulkAction('suspend')}
            >
              <UserX className="h-4 w-4 mr-2" />
              Suspend Selected
            </Button>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <Checkbox
              checked={selectedUsers.length === filteredUsers?.length}
              onCheckedChange={toggleSelectAll}
            />
          </div>
          
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            filteredUsers?.map((user) => (
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
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.profile?.username || 'No username'}
                    </p>
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
                    onClick={() => updateRoleMutation.mutate({ 
                      userId: user.id, 
                      newRole: user.role === 'admin' ? 'user' : 'admin' 
                    })}
                    title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateStatusMutation.mutate({ 
                      userId: user.id, 
                      newStatus: user.status === 'active' ? 'suspended' : 'active' 
                    })}
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
                    onClick={() => updateStatusMutation.mutate({ 
                      userId: user.id, 
                      newStatus: user.status === 'banned' ? 'active' : 'banned' 
                    })}
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};