import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ThemeDebugger } from "@/components/theme/ThemeDebugger";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { currentTheme, fetchPageTheme, isLoading, error } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        await fetchPageTheme('/');
      } catch (error) {
        console.error('Error loading theme:', error);
        toast({
          title: "Theme Error",
          description: "Failed to load theme. Using default theme.",
          variant: "destructive",
        });
      }
    };

    loadTheme();
  }, [fetchPageTheme, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="animate-pulse text-xl font-cyber">Loading theme...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-cyber-dark via-cyber-dark/90 to-cyber-dark/80 z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
      </div>
    </div>
  );
};

export default Index;