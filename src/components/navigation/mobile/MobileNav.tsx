import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileNav = ({ isOpen, onToggle }: MobileNavProps) => {
  return (
    <motion.button 
      onClick={onToggle}
      className="md:hidden relative text-foreground p-2 hover:bg-white/10 rounded-full transition-colors"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </motion.div>
    </motion.button>
  );
};