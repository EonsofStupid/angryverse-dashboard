import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MobileNavLinkProps {
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}

export const MobileNavLink = ({ to, onClick, className, children }: MobileNavLinkProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={to} 
        onClick={onClick}
        className={cn(
          "relative block w-full px-4 py-3",
          "text-lg font-semibold text-muted-foreground",
          "transition-all duration-300",
          "hover:text-foreground",
          "active:bg-white/10",
          "before:absolute before:inset-0 before:w-full before:h-full",
          "before:bg-gradient-to-r before:from-primary/0 before:to-primary/0",
          "hover:before:from-primary/5 hover:before:to-primary/0",
          "after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[1px]",
          "after:bg-primary/0 after:transition-all after:duration-300",
          "hover:after:bg-primary/20",
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
};