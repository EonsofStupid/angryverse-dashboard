import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, UserX } from "lucide-react";

interface UserActionsProps {
  selectedUsers: string[];
  onActionComplete: () => void;
}

export const UserActions = ({ selectedUsers, onActionComplete }: UserActionsProps) => {
  const queryClient = useQueryClient();

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

  return (
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
  );
};