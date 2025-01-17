import { UserMenu } from "./UserMenu";
import { DesktopNav } from "./navigation/desktop/DesktopNav";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { MobileMenu } from "./navigation/mobile/MobileMenu";
import { useNavAnimation } from "./navigation/hooks/useNavAnimation";
import { useNavTheme } from "./navigation/hooks/useNavTheme";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
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
            'shadow-lg',
            'shadow-primary/10',
            'bg-background/50',
            'backdrop-blur-md',
            'border-b',
            'border-white/10',
            'after:absolute after:inset-0',
            'after:bg-gradient-to-r after:from-primary/10 after:to-secondary/10',
            'after:opacity-50 after:pointer-events-none',
          ] : [
            'bg-transparent',
            'backdrop-blur-none',
            'border-transparent'
          ],
          isMobile ? 'h-14' : 'h-16',
          "before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-10 before:bg-repeat",
          "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px]",
          "after:bg-gradient-to-r after:from-transparent after:via-primary/50 after:to-transparent",
          "animate-fade-in"
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
            <UserMenu />
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 animate-scan-line bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        </div>
      </motion.nav>
      <div className={`h-${isMobile ? '14' : '16'}`} />
    </>
  );
};