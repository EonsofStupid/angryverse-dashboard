import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, Ban, UserX } from "lucide-react";

type UserStatus = 'active' | 'suspended' | 'banned';
type UserRole = 'user' | 'admin';

interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export const UserManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // First get all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        throw rolesError;
      }

      // Get users from auth.users through profiles, including their email
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      // Combine the data
      return users.users.map(user => {
        const userRole = userRoles?.find(role => role.user_id === user.id);
        return {
          id: user.id,
          email: user.email || 'No email',
          role: userRole?.role || 'user',
          status: 'active' as UserStatus // Default status
        };
      });
    }
  });

  const handleUpdateUserStatus = async (userId: string, newStatus: UserStatus) => {
    try {
      // Here you would update the user's status in your database
      // For now, we'll just show a toast
      toast.success(`User status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: newRole 
        }, { 
          onConflict: 'user_id,role'
        });

      if (error) throw error;
      toast.success("User role updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update user role");
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
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('all')}
            >
              All
            </Button>
            <Button
              variant={selectedStatus === 'active' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={selectedStatus === 'suspended' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('suspended')}
            >
              Suspended
            </Button>
            <Button
              variant={selectedStatus === 'banned' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('banned')}
            >
              Banned
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            filteredUsers?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{user.role}</Badge>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateUserRole(user.id, 'admin')}
                    title="Make Admin"
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateUserStatus(user.id, 'suspended')}
                    title="Suspend User"
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateUserStatus(user.id, 'banned')}
                    title="Ban User"
                  >
                    <Ban className="h-4 w-4" />
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