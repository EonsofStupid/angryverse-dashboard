import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DesktopNavLinkProps {
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}

export const DesktopNavLink = ({ to, onClick, className, children }: DesktopNavLinkProps) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "relative font-semibold text-muted-foreground hover:text-foreground",
        "hover-lift hover-glow group cursor-pointer",
        className
      )}
    >
      {children}
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 blur-lg bg-primary/30 
                     rounded-full scale-150" />
    </Link>
  );
};