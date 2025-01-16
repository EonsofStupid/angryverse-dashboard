import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";

interface UserMenuTriggerProps {
  user: User;
}

export const UserMenuTrigger = ({ user }: UserMenuTriggerProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <Button 
        variant="ghost" 
        className="relative h-10 w-10 rounded-full hover:bg-white/10"
      >
        <Avatar className="h-10 w-10 holographic">
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.email?.[0].toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
  );
};