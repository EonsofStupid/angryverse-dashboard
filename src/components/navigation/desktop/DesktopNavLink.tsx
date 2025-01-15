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
        "before:absolute before:inset-0 before:w-full before:h-full",
        "before:bg-white/0 hover:before:bg-white/5",
        "before:transition-colors before:duration-300",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px]",
        "after:bg-primary/0 after:transition-all after:duration-300",
        "hover:after:bg-primary/100",
        "hover:shadow-[0_0_20px_rgba(155,135,245,0.1)]",
        className
      )}
    >
      {children}
      <motion.span 
        className="absolute inset-0 -z-10 rounded-full bg-white/0"
        initial={false}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "rgba(255, 255, 255, 0.05)" 
        }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
};