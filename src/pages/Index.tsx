import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { VisualDatabase } from "@/components/VisualDatabase";
import { ThemeDebugger } from "@/components/theme/ThemeDebugger";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { Loader2 } from "lucide-react";
import { MotionEffects } from "@/components/effects/MotionEffects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackgroundContainer } from "@/components/backgrounds/BackgroundContainer";
import { CyberBackground } from "@/components/backgrounds/CyberBackground";
import { AnimatedLines } from "@/components/backgrounds/AnimatedLines";
import { GlitchOverlay } from "@/components/backgrounds/GlitchOverlay";

const Index = () => {
  const { currentTheme, isLoading, error } = useTheme();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <MotionEffects />
      
      <div className="relative z-10">
        <Navbar />
        <ScrollProgress />
        <Hero />
        
        <BackgroundContainer className="relative">
          {/* Matrix Rain Effect - Primary */}
          <AnimatedLines 
            direction="vertical"
            color="var(--theme-colors-cyber-matrix, #00ff00)"
            speed={3}
            spacing={20}
            opacity={0.12}
          />
          
          {/* Crossing Lines - Accent */}
          <AnimatedLines 
            direction="horizontal"
            color="var(--theme-colors-cyber-cyan)"
            speed={2}
            spacing={30}
            opacity={0.08}
          />
          
          {/* Base Cyber Background */}
          <CyberBackground 
            color="var(--theme-colors-cyber-purple)"
            opacity={0.2}
          />
          
          {/* Dynamic Glitch Effect */}
          <GlitchOverlay 
            intensity={0.25}
            frequency={1.8}
            color="var(--theme-colors-cyber-pink)"
          />
          
          <section className="py-20 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Visual <span className="text-gradient animate-glow">Database</span>
              </h2>
              <VisualDatabase />
            </div>
          </section>
        </BackgroundContainer>
        
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