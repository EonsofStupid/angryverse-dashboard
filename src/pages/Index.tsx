import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { VisualDatabase } from "@/components/VisualDatabase";
import { ThemeDebugger } from "@/components/theme/ThemeDebugger";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { Loader2 } from "lucide-react";
import { MotionEffects } from "@/components/effects/MotionEffects";

const Index = () => {
  const { currentTheme, isLoading, error } = useTheme();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <MotionEffects />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Visual <span className="text-gradient animate-glow">Database</span>
            </h2>
            <VisualDatabase />
          </div>
        </section>
        <Features />
        {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
        <Footer />
      </div>
      
      {isLoading && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-background/80 p-2 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm">Loading theme...</span>
        </div>
      )}
      
      {error && (
        <div className="fixed top-4 right-4 bg-destructive/80 text-destructive-foreground p-2 rounded-md">
          Theme error: {error.message}
        </div>
      )}
    </div>
  );
};

export default Index;