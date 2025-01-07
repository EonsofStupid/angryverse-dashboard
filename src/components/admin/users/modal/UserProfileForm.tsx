import { UserEditField } from "../UserEditField";
import { User } from "@/types/user";
import { FormData } from "./types";

interface UserProfileFormProps {
  user: User;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const UserProfileForm = ({ user, formData, setFormData }: UserProfileFormProps) => {
  return (
    <div className="space-y-4">
      <UserEditField
        id="username"
        label="Username"
        tooltip="Public username for the user"
        value={formData.username}
        onChange={(value) => setFormData({ ...formData, username: value })}
        className="glass hover-lift"
      />

      <UserEditField
        id="display_name"
        label="Display Name"
        tooltip="Full name shown on profile"
        value={formData.display_name}
        onChange={(value) => setFormData({ ...formData, display_name: value })}
        className="glass hover-lift"
      />

      <UserEditField
        id="email"
        label="Email"
        tooltip="User's email address"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        type="email"
        className="glass hover-lift"
      />
    </div>
  );
};