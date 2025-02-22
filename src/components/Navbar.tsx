import { Search, Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import { DesktopNav } from "./navigation/desktop/DesktopNav";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { MobileMenu } from "./navigation/mobile/MobileMenu";
import { useNavAnimation } from "./navigation/hooks/useNavAnimation";
import { useNavTheme } from "./navigation/hooks/useNavTheme";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { Input } from "./ui/input";

export const Navbar = () => {
  const { isMenuOpen, toggleMenu, setIsMenuOpen } = useNavAnimation();
  const theme = useNavTheme();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform scroll value to clip-path value
  const clipPath = useTransform(
    scrollY,
    [0, 100],
    [
      'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Rectangle
      'polygon(5% 0, 95% 0, 100% 100%, 0 100%)'  // Trapezoid
    ]
  );

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
        style={{ clipPath }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 w-full z-50",
          "transition-all duration-500 ease-in-out",
          "bg-[#1A1F2C]", // Dark purple background
          scrolled ? [
            'glass-frost',
            'shadow-lg shadow-primary/20',
            'backdrop-blur-xl',
            'border-t-0 border-x-0 border-b border-white/20',
          ] : [
            'backdrop-blur-none',
            'border-transparent',
          ],
          isMobile ? 'h-14' : 'h-16',
          // Base layer
          "before:absolute before:inset-0 before:z-0",
          "before:bg-gradient-to-b before:from-white/5 before:to-transparent/5",
          // Glitch effect layer
          "after:absolute after:inset-0 after:z-10",
          "after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,0,127,0.2)_45%,rgba(0,255,245,0.2)_55%,transparent_100%)]",
          "after:animate-glitch",
          // Enhanced shadow system
          "shadow-[0_4px_32px_rgba(0,0,0,0.2)]",
          "shadow-primary/10",
        )}>
        {/* Content wrapper with higher z-index */}
        <div 
          className={cn(
            "container mx-auto px-4 h-full relative z-20",
            "transition-all duration-500",
            scrolled ? 'py-0' : 'py-2'
          )}
        >
          <div className={cn(
            "flex items-center justify-between h-full",
            "transition-all duration-500"
          )}>
            <DesktopNav />
            <MobileNav isOpen={isMenuOpen} onToggle={toggleMenu} />
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Input
                  type="search"
                  placeholder="Search..."
                  className={cn(
                    "w-[200px] pl-9 h-9",
                    "bg-background/30 backdrop-blur-xl",
                    "border border-white/20",
                    "text-foreground/90",
                    "placeholder:text-foreground/50",
                    "focus:ring-primary/50 focus:border-primary/50",
                    "transition-all duration-300",
                    "hover:border-primary/30",
                    "glass",
                    "hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]",
                    "hover:shadow-primary/20",
                    "focus:shadow-[0_0_30px_rgba(0,0,0,0.3)]",
                    "focus:shadow-primary/30"
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
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          <div className="absolute inset-0 animate-scan-line bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        </div>

        {/* Enhanced Depth Layers */}
        <div className="absolute inset-0 pointer-events-none z-40">
          {/* Top light leak */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/30 to-transparent" />
        </div>
      </motion.nav>
      <div className={`h-${isMobile ? '14' : '16'}`} />
    </>
  );
};