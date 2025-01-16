import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuTriggerProps {
  gradientBorder: string;
  onClick: () => void;
}

export const UserMenuTrigger = ({ gradientBorder, onClick }: UserMenuTriggerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition(prev => (prev >= 100 ? 0 : prev + 1));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative transition-all duration-300 hover:bg-transparent group",
        "focus-visible:ring-1 focus-visible:ring-primary/50",
        "overflow-hidden z-50"
      )}
      style={{
        '--avatar-gradient': gradientBorder,
        '--scan-position': `${scanPosition}%`
      } as React.CSSProperties}
    >
      <div 
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-300",
          "before:absolute before:inset-0 before:rounded-full",
          "before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent",
          "before:translate-y-[-100%] before:animate-scan-line"
        )}
        style={{
          background: gradientBorder,
          filter: "blur(8px)",
          transform: "scale(1.2)",
          opacity: isHovered ? 0.8 : 0.3
        }}
      />
      <Avatar className={cn(
        "relative z-10 transition-all duration-300 w-9 h-9",
        "before:absolute before:inset-0 before:rounded-full before:p-[2px]",
        "before:bg-[var(--avatar-gradient)] before:content-[''] before:opacity-100",
        "after:absolute after:inset-[2px] after:rounded-full after:bg-background after:content-['']",
        "group-hover:scale-110",
        "group-hover:shadow-[0_0_25px_rgba(155,135,245,0.8)]"
      )}>
        <AvatarFallback className="bg-transparent">
          <User className="h-5 w-5 text-foreground/80" />
        </AvatarFallback>
      </Avatar>
    </Button>
  );
};