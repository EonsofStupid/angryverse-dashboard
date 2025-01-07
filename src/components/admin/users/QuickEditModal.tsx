import { useEffect, useState } from "react";
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Reset form when user changes or modal opens/closes
  useEffect(() => {
    if (user && isOpen) {
      setUsername(user.profile?.username || '');
      setEmail(user.email || '');
    }
  }, [user, isOpen]);

  const updateUserMutation = useMutation({
    mutationFn: async ({ username, email }: { username: string; email: string }) => {
      if (!user) return;

      let emailUpdated = false;

      // Only update username if it has changed
      if (username !== user.profile?.username) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ username })
          .eq('id', user.id);

        if (profileError) throw profileError;
      }

      // Only update email if it has changed
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email
        });

        if (emailError) throw emailError;
        emailUpdated = true;
      }

      return { emailUpdated };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      if (data?.emailUpdated) {
        toast.success("Email update confirmation sent to the new email address");
      } else {
        toast.success("Profile updated successfully");
      }
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