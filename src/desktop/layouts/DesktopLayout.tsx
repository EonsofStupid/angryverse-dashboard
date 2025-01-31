import { Navbar } from "@/desktop/components/navigation/Navbar";
import { Footer } from "@/desktop/components/navigation/Footer";
import { ScrollProgress } from "@/shared/components/ScrollProgress";
import { MotionEffects } from "@/shared/components/effects/MotionEffects";
import { BackgroundContainer } from "@/shared/components/backgrounds/BackgroundContainer";
import { CyberBackground } from "@/shared/components/backgrounds/CyberBackground";
import { AnimatedLines } from "@/shared/components/backgrounds/AnimatedLines";
import { GlitchOverlay } from "@/shared/components/backgrounds/GlitchOverlay";
import type { ReactNode } from "react";

interface DesktopLayoutProps {
  children: ReactNode;
}

export const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <MotionEffects />
      
      <div className="relative z-10">
        <Navbar />
        <ScrollProgress />
        
        <BackgroundContainer className="relative">
          <AnimatedLines 
            direction="vertical"
            color="var(--theme-colors-cyber-matrix)"
            speed={3}
            spacing={20}
            opacity={0.12}
          />
          
          <AnimatedLines 
            direction="horizontal"
            color="var(--theme-colors-cyber-cyan)"
            speed={2}
            spacing={30}
            opacity={0.08}
          />
          
          <CyberBackground 
            color="var(--theme-colors-cyber-purple)"
            opacity={0.2}
          />
          
          <GlitchOverlay 
            intensity={0.25}
            frequency={1.8}
            color="var(--theme-colors-cyber-pink)"
          />
          
          {children}
        </BackgroundContainer>
        
        <Footer />
      </div>
    </div>
  );
};