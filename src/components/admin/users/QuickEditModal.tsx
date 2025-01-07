import { useEffect, useState } from "react";
import { User, UserStatus } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Save, X, User as UserIcon, Shield, Clock } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserEditField } from "./UserEditField";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface QuickEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  username: string;
  display_name: string;
  email: string;
}

export const QuickEditModal = ({ user, isOpen, onClose }: QuickEditModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    display_name: '',
    email: '',
  });
  const [sendNotification, setSendNotification] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        username: user.profile?.username || '',
        display_name: user.profile?.display_name || '',
        email: user.email || '',
      });
      setSendNotification(false);
    }
  }, [user, isOpen]);

  const updateUserMutation = useMutation({
    mutationFn: async ({ username, display_name, email }: FormData) => {
      if (!user) return;

      const updates: Record<string, any> = {};
      const emailUpdates: Record<string, any> = {};
      let emailUpdated = false;

      // Profile updates
      if (username !== user.profile?.username || display_name !== user.profile?.display_name) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            username,
            display_name,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (profileError) throw profileError;
        updates.username = username;
        updates.display_name = display_name;
      }

      // Email update
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.admin.updateUserById(
          user.id,
          { email: email }
        );

        if (emailError) throw emailError;
        emailUpdated = true;
        emailUpdates.email = email;
      }

      // Log the activity
      await supabase.from('user_activity_logs').insert({
        user_id: user.id,
        action_type: 'profile_update',
        action_details: { ...updates, ...emailUpdates }
      });

      // Send notification if enabled
      if (sendNotification && (Object.keys(updates).length > 0 || emailUpdated)) {
        const { error: notificationError } = await supabase.functions.invoke('send-profile-update-email', {
          body: {
            userId: user.id,
            updates: { ...updates, ...emailUpdates }
          }
        });

        if (notificationError) {
          console.error('Notification error:', notificationError);
          toast.error("Profile updated but failed to send notification email");
        }
      }

      return { emailUpdated };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      if (data?.emailUpdated) {
        toast.success("Profile updated. Email verification sent.");
      } else {
        toast.success("Profile updated successfully");
      }
      onClose();
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error("Failed to update profile");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  const getStatusBadgeClass = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'success-gradient';
      case 'suspended':
        return 'warning-gradient';
      case 'banned':
        return 'error-gradient';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] neo-blur">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary" />
            Edit User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Admin Info Section */}
          <div className="bg-muted/10 rounded-lg p-4 space-y-2 neo-blur">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Admin View</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground/80">
              ID: {user?.id}
            </div>
            {user?.profile?.last_active && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <Clock className="w-3 h-3" />
                Last active: {format(new Date(user.profile.last_active), 'PPp')}
              </div>
            )}
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(user?.status || 'active')}`}>
              {user?.status || 'active'}
            </div>
          </div>

          <TooltipProvider>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <UserEditField
                  id="username"
                  label="Username"
                  tooltip="Publicly visible name"
                  value={formData.username}
                  onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
                  className="glass hover-lift"
                />

                <UserEditField
                  id="display_name"
                  label="Display Name"
                  tooltip="Full name shown on profile"
                  value={formData.display_name}
                  onChange={(value) => setFormData(prev => ({ ...prev, display_name: value }))}
                  className="glass hover-lift"
                />

                <UserEditField
                  id="email"
                  label="Email"
                  tooltip="Admin only - Requires verification"
                  value={formData.email}
                  onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                  type="email"
                  className="glass hover-lift"
                />

                <div className="flex items-center space-x-2 pt-2">
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
                  className="hover-lift active-scale neo-blur"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="hover-lift active-scale success-gradient"
                >
                  {updateUserMutation.isPending ? (
                    <>
                      <span className="animate-pulse">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};