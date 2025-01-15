import { Menu, X } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileNav = ({ isOpen, onToggle }: MobileNavProps) => {
  return (
    <button 
      onClick={onToggle}
      className="md:hidden relative text-foreground hover-lift hover-glow group"
    >
      {isOpen ? (
        <X className="h-6 w-6 transform transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Menu className="h-6 w-6 transform transition-transform duration-300 rotate-0 hover:rotate-180" />
      )}
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 blur-lg bg-primary/30 
                     rounded-full scale-150" />
    </button>
  );
};