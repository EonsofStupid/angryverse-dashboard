import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { UserFilter } from "./UserFilter";
import { UserActions } from "./UserActions";
import { UserStatus, User } from "@/types/user";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserListContent } from "./UserListContent";
import { QuickEditModal } from "./QuickEditModal";
import { Loader2 } from "lucide-react";
import { useAdminUsersStore } from "@/store/useAdminUsersStore";

export const UserList = () => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const {
    users,
    selectedUsers,
    isLoading,
    currentFilter,
    fetchUsers,
    selectUser,
    deselectUser,
    selectAll,
    deselectAll,
    setFilter
  } = useAdminUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(user => {
    if (activeTab === "active") {
      return user.status === "active";
    }
    return currentFilter === 'all' ? true : user.status === currentFilter;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAll();
    } else {
      deselectAll();
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      selectUser(userId);
    } else {
      deselectUser(userId);
    }
  };

  const handleQuickEdit = (user: User) => {
    console.log('Opening quick edit for user:', user);
    setEditingUser(user);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="neo-blur">
        <CardContent className="p-6">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active Users</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <UserFilter
                selectedStatus={currentFilter}
                onStatusChange={setFilter}
              />
              
              {selectedUsers.length > 0 && (
                <UserActions
                  selectedUsers={selectedUsers}
                  onActionComplete={deselectAll}
                />
              )}
              
              <UserListContent
                users={filteredUsers}
                selectedUsers={selectedUsers}
                onSelectUser={handleSelectUser}
                onSelectAll={handleSelectAll}
                onQuickEdit={handleQuickEdit}
              />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <UserListContent
                users={filteredUsers}
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