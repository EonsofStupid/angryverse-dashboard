import { UserMenu } from "./UserMenu";
import { DesktopNav } from "./navigation/desktop/DesktopNav";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { MobileMenu } from "./navigation/mobile/MobileMenu";
import { useNavAnimation } from "./navigation/hooks/useNavAnimation";
import { useNavTheme } from "./navigation/hooks/useNavTheme";

export const Navbar = () => {
  const { isMenuOpen, toggleMenu, setIsMenuOpen } = useNavAnimation();
  const theme = useNavTheme();

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
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
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  );
};