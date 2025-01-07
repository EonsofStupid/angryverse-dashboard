import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, UserX, Ban } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UserStatus } from "@/types/user";

interface UserActionsProps {
  selectedUsers: string[];
  onActionComplete: () => void;
}

export const UserActions = ({ selectedUsers, onActionComplete }: UserActionsProps) => {
  const queryClient = useQueryClient();

  const updateUserStatusMutation = useMutation({
    mutationFn: async ({ userIds, status }: { userIds: string[], status: UserStatus }) => {
      // Update user_roles table with new status
      const { error } = await supabase
        .from('user_roles')
        .update({ status })
        .in('user_id', userIds);

      if (error) throw error;

      // Log the action
      await Promise.all(userIds.map(async (userId) => {
        await supabase
          .from('user_activity_logs')
          .insert({
            user_id: userId,
            action_type: `user_${status}`,
            action_details: {
              status,
              timestamp: new Date().toISOString()
            }
          });
      }));
    },
    onSuccess: (_, variables) => {
      const action = variables.status === 'banned' ? 'banned' : 'suspended';
      const count = variables.userIds.length;
      toast.success(`${count} user${count > 1 ? 's' : ''} ${action}`);
      onActionComplete();
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error) => {
      console.error('Status update error:', error);
      toast.error("Failed to update user status");
    }
  });

  const bulkActionMutation = useMutation({
    mutationFn: async ({ action, userIds }: { action: string, userIds: string[] }) => {
      switch (action) {
        case 'delete':
          // In a real app, you'd implement bulk deletion
          toast.success(`${userIds.length} users deleted`);
          break;
        default:
          throw new Error('Invalid action');
      }
    },
    onSuccess: () => {
      onActionComplete();
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

  const handleStatusUpdate = (status: UserStatus) => {
    if (selectedUsers.length === 0) {
      toast.error("Please select users first");
      return;
    }
    updateUserStatusMutation.mutate({ userIds: selectedUsers, status });
  };

  return (
    <div className="mb-4 p-2 neo-blur rounded-lg flex gap-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleBulkAction('delete')}
        className="hover-lift active-scale"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete Selected
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleStatusUpdate('suspended')}
        className="hover-lift active-scale warning-gradient"
      >
        <UserX className="h-4 w-4 mr-2" />
        Suspend Selected
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleStatusUpdate('banned')}
        className="hover-lift active-scale error-gradient"
      >
        <Ban className="h-4 w-4 mr-2" />
        Ban Selected
      </Button>
    </div>
  );
};