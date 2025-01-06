import { Navbar } from "@/components/Navbar";
import { PortalContent } from "@/components/portal/PortalContent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRoleCheck } from "@/hooks/useRoleCheck";

const Portal = () => {
  const { user, isLoading: authLoading } = useAuthStore();
  const { hasRole: isAdmin, isLoading: roleLoading } = useRoleCheck(user, 'admin');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
      return;
    }
  }, [user, authLoading, navigate]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/90 to-background/80 z-0" />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <PortalContent />
        </div>
      </div>
    </div>
  );
};

export default Portal;