import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuTriggerProps {
  onClick: () => void;
  gradientBorder: string;
}

export const UserMenuTrigger = ({ onClick, gradientBorder }: UserMenuTriggerProps) => {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="relative transition-all duration-300 hover:bg-transparent group focus-visible:ring-1 focus-visible:ring-primary/50 overflow-hidden z-50"
      onClick={() => {
        console.log('UserMenu trigger clicked');
        onClick();
      }}
      style={{
        '--avatar-gradient': gradientBorder
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: gradientBorder,
          filter: "blur(8px)",
          transform: "scale(1.2)"
        }} 
      />
      <Avatar className="relative z-10 transition-all duration-300 w-9 h-9 before:absolute before:inset-0 before:rounded-full before:p-[2px] before:bg-[var(--avatar-gradient)] before:content-[''] before:opacity-100 after:absolute after:inset-[2px] after:rounded-full after:bg-background after:content-[''] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(155,135,245,0.8)]">
        <AvatarFallback className="bg-transparent">
          <User className="h-5 w-5 text-foreground/80" />
        </AvatarFallback>
      </Avatar>
    </Button>
  );
};