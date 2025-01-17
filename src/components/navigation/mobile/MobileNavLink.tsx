import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const MobileNavLink = ({ to, children, onClick }: MobileNavLinkProps) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "block px-4 py-2 rounded-md",
          "text-foreground/80 hover:text-foreground",
          "transition-colors duration-200",
          "hover:bg-primary/10",
          "relative overflow-hidden",
          "after:absolute after:inset-0",
          "after:bg-gradient-to-r after:from-primary/20 after:to-transparent",
          "after:opacity-0 hover:after:opacity-100",
          "after:transition-opacity after:duration-300"
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
};