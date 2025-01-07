import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface UserEditFieldProps {
  id: string;
  label: string;
  tooltip: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}

export const UserEditField = ({
  id,
  label,
  tooltip,
  value,
  onChange,
  type = "text",
  className,
}: UserEditFieldProps) => {
  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id} 
        className={cn(
          "flex items-center gap-2",
          "text-sm font-medium",
          "text-admin-foreground/80"
        )}
      >
        {label}
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-admin-foreground/60 cursor-help transition-colors hover:text-admin-primary" />
          </TooltipTrigger>
          <TooltipContent className="bg-admin-background/95 border-admin-primary/20">
            <p className="text-sm text-admin-foreground/80">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </Label>

      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "transition-all duration-200",
          "focus:ring-2 focus:ring-admin-primary/20",
          className
        )}
      />
    </div>
  );
};