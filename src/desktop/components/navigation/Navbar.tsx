import { useTheme } from "@/hooks/useTheme";

export const Navbar = () => {
  const { currentTheme } = useTheme();
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold">Logo</span>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};