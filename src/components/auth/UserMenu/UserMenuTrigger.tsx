import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserMenuTriggerProps {
  onClick: () => void;
  colors: string[];
}

export const UserMenuTrigger = ({ onClick, colors }: UserMenuTriggerProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "relative h-8 w-8 rounded-full",
        "border border-primary/10",
        "bg-background/80 backdrop-blur-sm",
        "hover:bg-primary/10",
        "transition-colors duration-200"
      )}
      style={{
        background: `linear-gradient(45deg, ${colors.join(", ")})`,
      }}
    >
      <span className="sr-only">Open user menu</span>
    </Button>
  );
};
