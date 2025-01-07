import { UserStatus } from "@/types/user";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const getStatusClasses = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'suspended':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'banned':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusClasses(status)}`}>
      {status}
    </span>
  );
};