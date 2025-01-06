import { User } from "@/types/user";
import { UserListItem } from "./UserListItem";
import { Checkbox } from "@/components/ui/checkbox";

interface UserListContentProps {
  users: User[];
  selectedUsers: string[];
  onSelectUser: (userId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export const UserListContent = ({ 
  users, 
  selectedUsers, 
  onSelectUser, 
  onSelectAll 
}: UserListContentProps) => {
  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <Checkbox
          checked={selectedUsers.length === users.length}
          onCheckedChange={onSelectAll}
        />
      </div>
      
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          isSelected={selectedUsers.includes(user.id)}
          onSelect={(checked) => {
            onSelectUser(user.id, checked);
          }}
        />
      ))}
    </div>
  );
};