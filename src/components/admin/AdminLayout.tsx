import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
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

  // Create animated background effect
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

  // Get the primary color from the current theme for glass tint
  const primaryColor = currentTheme?.configuration?.colors?.cyber?.pink?.DEFAULT || 'hsl(var(--primary))';

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main 
          ref={mainRef}
          className={`
            relative flex-1 transition-all duration-300 
            ${sidebarOpen ? 'ml-64' : 'ml-16'}
          `}
        >
          <div 
            className={`
              container mx-auto px-6 py-8 relative z-10
              before:absolute before:inset-0 before:rounded-lg
              before:bg-gradient-to-b before:from-primary/5 before:to-transparent
              before:pointer-events-none
            `}
          >
            <div className="neo-blur rounded-lg p-6 animate-fade-in">
              <AdminBreadcrumb />
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .link-animation {
          position: relative;
          display: inline-block;
          color: hsl(var(--muted-foreground));
          transition: color 0.3s;
        }

        .link-animation::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          color: ${primaryColor};
          overflow: hidden;
          white-space: nowrap;
          transition: width 0.3s ease-in-out;
        }

        .link-animation:hover::before {
          width: 100%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};