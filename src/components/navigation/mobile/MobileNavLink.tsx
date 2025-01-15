import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}

export const MobileNavLink = ({ to, onClick, className, children }: MobileNavLinkProps) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "block relative text-muted-foreground hover:text-foreground",
        "hover-lift hover-glow group",
        className
      )}
    >
      {children}
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 blur-lg bg-primary/30" />
    </Link>
  );
};