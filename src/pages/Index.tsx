import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { useAuthStore } from "@/store/useAuthStore";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, isLoading } = useAuthStore();
  const { hasRole: isAdmin, isLoading: isCheckingRole } = useRoleCheck(user, 'admin');
  const navigate = useNavigate();

  // Log auth state changes for debugging
  useEffect(() => {
    console.log("Auth state changed:", { user, isAdmin, isLoading, isCheckingRole });
  }, [user, isAdmin, isLoading, isCheckingRole]);

  if (isLoading || isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default Index;