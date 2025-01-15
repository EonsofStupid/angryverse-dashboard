import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
        "relative font-semibold text-muted-foreground",
        "group cursor-pointer px-3 py-2",
        "hover:text-foreground transition-colors",
        className
      )}
    >
      {children}
      <motion.span 
        className="absolute inset-0 -z-10 rounded-full bg-white/5"
        initial={false}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "rgba(255, 255, 255, 0.1)" 
        }}
        transition={{ duration: 0.2 }}
      />
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/0 group-hover:bg-primary/100 transition-colors duration-300" />
    </Link>
  );
};