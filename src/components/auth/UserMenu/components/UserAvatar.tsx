import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  gradientBorder: string;
}

export const UserAvatar = ({ gradientBorder }: UserAvatarProps) => {
  return (
    <Avatar 
      className={cn(
        "user-menu-avatar"
      )}
      style={{
        '--avatar-gradient': gradientBorder
      } as React.CSSProperties}
    >
      <AvatarFallback className="bg-transparent">
        <User className="h-5 w-5 text-foreground/80" />
      </AvatarFallback>
    </Avatar>
  );
};