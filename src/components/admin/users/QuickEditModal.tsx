import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Save, X } from "lucide-react";

interface QuickEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  username: string;
  email: string;
}

export const QuickEditModal = ({ user, isOpen, onClose }: QuickEditModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
  });
  const [sendNotification, setSendNotification] = useState(false);

  // Reset form when user changes or modal opens/closes
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        username: user.profile?.username || '',
        email: user.email || '',
      });
      setSendNotification(false);
    }
  }, [user, isOpen]);

  const updateUserMutation = useMutation({
    mutationFn: async ({ username, email }: FormData) => {
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

      // Send notification email if requested
      if (sendNotification) {
        const { error: notificationError } = await supabase.functions.invoke('send-profile-update-email', {
          body: {
            userId: user.id,
            updates: {
              ...(username !== user.profile?.username && { username }),
              ...(email !== user.email && { email })
            }
          }
        });

        if (notificationError) {
          toast.error("Failed to send notification email");
        }
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
    updateUserMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit User Profile</DialogTitle>
        </DialogHeader>

        <div className="bg-muted/50 rounded-lg p-4 mb-4 text-sm">
          <p className="text-muted-foreground">User ID: {user?.id}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-background"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notify"
                checked={sendNotification}
                onChange={(e) => setSendNotification(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="notify" className="text-sm text-muted-foreground">
                Notify user about changes
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updateUserMutation.isPending}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={updateUserMutation.isPending}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};