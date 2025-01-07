import { UserEditField } from "../UserEditField";
import { User } from "@/types/user";
import { FormData } from "./types";
import { cn } from "@/lib/utils";

interface UserProfileFormProps {
  user: User;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const UserProfileForm = ({ user, formData, setFormData }: UserProfileFormProps) => {
  return (
    <div className="space-y-6">
      <UserEditField
        id="email"
        label="Email Address"
        tooltip="User's primary email address"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        type="email"
        className={cn(
          "bg-admin-background/50",
          "border-admin-primary/20",
          "text-admin-foreground",
          "placeholder:text-admin-foreground/50",
          "focus:border-admin-primary",
          "focus:ring-admin-primary/30"
        )}
      />

      <UserEditField
        id="username"
        label="Username"
        tooltip="Public username for the user"
        value={formData.username}
        onChange={(value) => setFormData({ ...formData, username: value })}
        className={cn(
          "bg-admin-background/50",
          "border-admin-primary/20",
          "text-admin-foreground",
          "placeholder:text-admin-foreground/50",
          "focus:border-admin-primary",
          "focus:ring-admin-primary/30"
        )}
      />

      <UserEditField
        id="display_name"
        label="Display Name"
        tooltip="Full name shown on profile"
        value={formData.display_name}
        onChange={(value) => setFormData({ ...formData, display_name: value })}
        className={cn(
          "bg-admin-background/50",
          "border-admin-primary/20",
          "text-admin-foreground",
          "placeholder:text-admin-foreground/50",
          "focus:border-admin-primary",
          "focus:ring-admin-primary/30"
        )}
      />
    </div>
  );
};