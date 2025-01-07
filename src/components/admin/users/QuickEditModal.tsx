import { useState } from "react";
import { User } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuickEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickEditModal = ({ user, isOpen, onClose }: QuickEditModalProps) => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState(user?.profile?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const updateUserMutation = useMutation({
    mutationFn: async ({ username, email }: { username: string; email: string }) => {
      if (!user) return;

      const updates: Record<string, any> = {};
      const emailUpdates: Record<string, any> = {};

      if (username !== user.profile?.username) {
        updates.username = username;
      }

      if (email !== user.email) {
        emailUpdates.email = email;
      }

      if (Object.keys(updates).length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);

        if (profileError) throw profileError;
      }

      if (Object.keys(emailUpdates).length > 0) {
        const { error: emailError } = await supabase.auth.admin.updateUserById(
          user.id,
          emailUpdates
        );

        if (emailError) throw emailError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success("User updated successfully");
      onClose();
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error("Failed to update user");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({ username, email });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};