import { AdminSidebar } from "./AdminSidebar";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { AdminFooter } from "./AdminFooter";
import { useAdminStore } from "@/store/useAdminStore";
import { useTheme } from "@/hooks/useTheme";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const sidebarOpen = useAdminStore((state) => state.sidebarOpen);
  const { isLoading, error, currentTheme } = useTheme();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full bg-primary/10 animate-float';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      main.appendChild(particle);

      setTimeout(() => particle.remove(), 3000);
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const primaryColor = currentTheme?.configuration?.colors?.cyber?.pink?.DEFAULT || 'hsl(var(--primary))';
    document.documentElement.style.setProperty('--link-hover-color', primaryColor);
  }, [currentTheme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-destructive">Theme Error</p>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex flex-1">
        <AdminSidebar />
        <main 
          ref={mainRef}
          className={`
            relative flex-1 transition-all duration-300 flex flex-col
            ${sidebarOpen ? 'ml-64' : 'ml-16'}
          `}
        >
          <div className="container mx-auto px-6 py-8 flex-1">
            <div className="neo-blur rounded-lg p-6 animate-fade-in">
              <AdminBreadcrumb />
              <div className="mt-4">{children}</div>
            </div>
          </div>
          <AdminFooter />
        </main>
      </div>
    </div>
  );
};