import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { 
    user, 
    profile,
    role,
    status,
    isLoading,
    refreshSession,
    loadUserProfile,
    subscribeToUpdates
  } = useAuthStore();

  // Initialize auth state
  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToUpdates();
      return () => unsubscribe();
    }
  }, [user, subscribeToUpdates]);

  // Debug logging
  useEffect(() => {
    console.log("Auth state changed:", { 
      user, 
      profile,
      role,
      status,
      isLoading 
    });
  }, [user, profile, role, status, isLoading]);

  if (isLoading) {
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