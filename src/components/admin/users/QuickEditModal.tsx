import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, X, User as UserIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserStatusBadge } from "./modal/UserStatusBadge";
import { UserProfileForm } from "./modal/UserProfileForm";
import { FormData } from "./modal/types";
import { cn } from "@/lib/utils";

interface QuickEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickEditModal = ({ user, isOpen, onClose }: QuickEditModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    display_name: '',
    email: '',
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        username: user.profile?.username || '',
        display_name: user.profile?.display_name || '',
        email: user.email || '',
      });
    }
  }, [user, isOpen]);

  const updateUserMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user) throw new Error("No user selected");

      const updates: Record<string, any> = {};
      const emailUpdates: Record<string, any> = {};

      if (data.username !== user.profile?.username || data.display_name !== user.profile?.display_name) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            username: data.username,
            display_name: data.display_name,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (profileError) throw profileError;
        updates.username = data.username;
        updates.display_name = data.display_name;
      }

      if (data.email !== user.email) {
        const { error: emailError } = await supabase.auth.admin.updateUserById(
          user.id,
          { email: data.email }
        );

        if (emailError) throw emailError;
        emailUpdates.email = data.email;
      }

      await supabase.from('user_activity_logs').insert({
        user_id: user.id,
        action_type: 'profile_update',
        action_details: { ...updates, ...emailUpdates }
      });

      return { updates, emailUpdates };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      if (data?.emailUpdates.email) {
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

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn(
        "sm:max-w-[425px] admin-glass",
        "border border-admin-primary/20",
        "backdrop-blur-md shadow-xl"
      )}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-admin-foreground">
            <UserIcon className="w-5 h-5 text-admin-primary" />
            Edit User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-admin-background/10 rounded-lg p-4 space-y-2 border border-admin-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-admin-foreground/80">User Status</span>
              <UserStatusBadge status={user.status} />
            </div>
            <div className="font-mono text-xs text-admin-foreground/60">
              ID: {user.id}
            </div>
          </div>

          <TooltipProvider>
            <form onSubmit={handleSubmit} className="space-y-6">
              <UserProfileForm 
                user={user}
                formData={formData}
                setFormData={setFormData}
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-admin-primary/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={updateUserMutation.isPending}
                  className={cn(
                    "hover:bg-admin-background/80",
                    "border-admin-primary/20",
                    "text-admin-foreground"
                  )}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className={cn(
                    "bg-admin-primary hover:bg-admin-primary/90",
                    "text-admin-foreground"
                  )}
                >
                  {updateUserMutation.isPending ? (
                    <span className="animate-pulse">Saving...</span>
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