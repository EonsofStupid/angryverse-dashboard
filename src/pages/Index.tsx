import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ThemeDebugger } from "@/components/theme/ThemeDebugger";
import { useTheme } from "@/hooks/useTheme";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { currentTheme, isLoading, error } = useTheme();

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