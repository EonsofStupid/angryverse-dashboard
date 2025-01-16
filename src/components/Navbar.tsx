import { UserMenu } from "@/auth/components/UserMenu";
import { DesktopNav } from "./navigation/desktop/DesktopNav";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { MobileMenu } from "./navigation/mobile/MobileMenu";
import { useNavAnimation } from "./navigation/hooks/useNavAnimation";
import { useNavTheme } from "./navigation/hooks/useNavTheme";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
      <nav className={cn(
        "fixed top-0 w-full",
        "transition-all duration-300 ease-in-out",
        "z-50",
        scrolled ? [
          'glass-frost',
          'shadow-lg',
          'bg-background/50',
          'backdrop-blur-md',
          'border-b',
          'border-white/10'
        ] : [
          'bg-transparent',
          'backdrop-blur-none',
          'border-transparent'
        ],
        isMobile ? 'h-14' : 'h-16',
        "animate-fade-in",
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

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </nav>
      <div className={`h-${isMobile ? '14' : '16'}`} />
    </>
  );
};