import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ThemeDebugger } from "@/components/theme/ThemeDebugger";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { currentTheme, fetchPageTheme, isLoading, error } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        await fetchPageTheme('/');
      } catch (err) {
        console.error('Error loading theme:', err);
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
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-xl font-cyber">Loading theme...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-xl text-destructive">
          Error loading theme: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
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