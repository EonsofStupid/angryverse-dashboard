import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Ban, UserX, CheckCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onQuickEdit: (user: User) => void;
}

export const UserListItem = ({ user, isSelected, onSelect, onQuickEdit }: UserListItemProps) => {
  const navigate = useNavigate();

  const handleEditUser = (userId: string) => {
    navigate(`/admin/users/${userId}/edit`);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
        />
        <div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onQuickEdit(user)}
              className="font-medium hover:text-primary"
            >
              {user.profile?.display_name || user.profile?.username || 'No username'}
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleEditUser(user.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          {user.profile?.location && (
            <p className="text-sm text-muted-foreground">{user.profile.location}</p>
          )}
          <div className="flex gap-2 mt-1">
            <Badge variant="outline">{user.role}</Badge>
            <Badge 
              variant={user.status === 'active' ? 'default' : 'destructive'}
            >
              {user.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
        >
          <Shield className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
        >
          {user.status === 'active' ? (
            <UserX className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          title={user.status === 'banned' ? 'Unban User' : 'Ban User'}
        >
          {user.status === 'banned' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Ban className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};