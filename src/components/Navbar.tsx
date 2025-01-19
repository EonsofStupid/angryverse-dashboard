import { UserMenu } from "./auth/UserMenu/";
import { DesktopNav } from "./navigation/desktop/DesktopNav";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { MobileMenu } from "./navigation/mobile/MobileMenu";
import { useNavAnimation } from "./navigation/hooks/useNavAnimation";
import { useNavTheme } from "./navigation/hooks/useNavTheme";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export const Navbar = () => {
  console.log("Navbar rendering"); // Debug log
  const { isMenuOpen, toggleMenu, setIsMenuOpen } = useNavAnimation();
  const theme = useNavTheme();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 w-full z-50",
          "transition-all duration-300 ease-in-out",
          scrolled ? [
            'glass-frost',
            'shadow-lg shadow-primary/10',
            'bg-background/50',
            'backdrop-blur-md',
            'border-b border-white/10',
            'after:absolute after:inset-0',
            'after:bg-gradient-to-r after:from-primary/10 after:to-secondary/10',
            'after:opacity-50 after:pointer-events-none',
          ] : [
            'bg-transparent',
            'backdrop-blur-none',
            'border-transparent'
          ],
          isMobile ? 'h-14' : 'h-16',
          // Grid pattern overlay
          "before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-10 before:bg-repeat",
          // Top gradient border
          "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px]",
          "after:bg-gradient-to-r after:from-transparent after:via-primary/50 after:to-transparent",
          // Base animation
          "animate-fade-in",
          // Glass depth effect
          "before:absolute before:inset-0 before:bg-gradient-to-b",
          "before:from-white/5 before:to-transparent before:pointer-events-none",
          // Additional depth layers
          "after:absolute after:inset-0 after:bg-gradient-to-t",
          "after:from-black/20 after:to-transparent after:pointer-events-none",
          // Dramatic shadow
          "shadow-[0_4px_32px_rgba(0,0,0,0.1)]",
          "shadow-primary/5"
        )}>
        <div className={cn(
          "container mx-auto px-4 h-full relative",
          scrolled ? 'py-0' : 'py-2'
        )}>
          <div className={cn(
            "flex items-center justify-between h-full",
            "transition-all duration-300"
          )}>
            <DesktopNav />
            <MobileNav isOpen={isMenuOpen} onToggle={toggleMenu} />
            
            <div className="flex items-center gap-4">
              {/* Search Input with glass effect */}
              <div className="relative hidden md:block">
                <Input
                  type="search"
                  placeholder="Search..."
                  className={cn(
                    "w-[200px] pl-9 h-9",
                    "bg-background/50 backdrop-blur-sm",
                    "border border-white/10",
                    "text-foreground/90",
                    "placeholder:text-foreground/50",
                    "focus:ring-primary/50 focus:border-primary/50",
                    "transition-all duration-300",
                    "hover:border-primary/30",
                    "glass",
                    // Input hover effects
                    "hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]",
                    "hover:shadow-primary/10",
                    "focus:shadow-[0_0_30px_rgba(0,0,0,0.2)]",
                    "focus:shadow-primary/20"
                  )}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              </div>
              <UserMenu />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu 
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 animate-scan-line bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        </div>

        {/* Additional Depth Layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top light leak */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </div>
      </motion.nav>
      <div className={`h-${isMobile ? '14' : '16'}`} />
    </>
  );
};