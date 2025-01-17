import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const THEME_COLORS = [
  'rgba(139, 92, 246, 0.8)',   // Vivid Purple
  'rgba(217, 70, 239, 0.8)',   // Magenta Pink
  'rgba(249, 115, 22, 0.8)',   // Bright Orange
  'rgba(14, 165, 233, 0.8)',   // Ocean Blue
  'rgba(255, 0, 127, 0.8)',    // Cyber Pink
  'rgba(0, 255, 245, 0.8)',    // Cyber Cyan
  'rgba(121, 40, 202, 0.8)'    // Cyber Purple
];

const getRandomColors = () => {
  const shuffled = [...THEME_COLORS].sort(() => 0.5 - Math.random());
  const numColors = Math.floor(Math.random() * 2) + 4;
  return shuffled.slice(0, numColors);
};

interface UserMenuTriggerProps {
  onClick: () => void;
}

export const UserMenuTrigger = ({ onClick }: UserMenuTriggerProps) => {
  const colors = getRandomColors();
  const gradientBorder = `linear-gradient(45deg, ${colors.join(', ')})`;

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