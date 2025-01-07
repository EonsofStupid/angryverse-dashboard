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
    <div className="space-y-4">
      {/* Label with Tooltip */}
      <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-foreground">
        {label}
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-5 h-5 text-muted-foreground cursor-pointer hover-scale" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm text-muted-foreground">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </Label>

      {/* Input Field */}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`glass transition-transform duration-200 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 ${className}`}
      />
    </div>
  );
};
