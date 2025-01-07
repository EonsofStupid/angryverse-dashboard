import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <Label htmlFor={id} className="flex items-center gap-2">
        {label}
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </div>
  );
};