import { UserMenu } from "./UserMenu";
import { DesktopNav } from "./navigation/desktop/DesktopNav";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { MobileMenu } from "./navigation/mobile/MobileMenu";
import { useNavAnimation } from "./navigation/hooks/useNavAnimation";
import { useNavTheme } from "./navigation/hooks/useNavTheme";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
      <nav className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'glass-frost shadow-lg' : 'glass'}
        ${isMobile ? 'h-14' : 'h-16'}
        animate-fade-in backdrop-blur-md
        before:absolute before:inset-0 before:w-full before:h-full
        before:bg-gradient-to-b before:from-white/5 before:to-transparent
        before:pointer-events-none
        after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px]
        after:bg-[#9b87f5] after:opacity-50
        after:shadow-[0_0_8px_#9b87f5,0_0_12px_#8B5CF6]
        hover:after:opacity-75 hover:after:shadow-[0_0_12px_#9b87f5,0_0_18px_#8B5CF6]
        transition-all duration-300
      `}>
        <div className="container mx-auto px-4 h-full relative">
          <div className={`
            flex items-center justify-between h-full
            ${scrolled ? 'py-2' : 'py-3'}
            transition-all duration-300
          `}>
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
      <div className={`h-${isMobile ? '14' : '16'}`} /> {/* Spacer for fixed navbar */}
    </>
  );
};