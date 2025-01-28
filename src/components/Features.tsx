import { BookOpen, Newspaper, Rss, Video } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";
import { useState, useRef, useEffect } from "react";
import type { CSSColor } from "@/types/theme/utils/css";
import { BackgroundContainer } from "./backgrounds/BackgroundContainer";
import { CyberBackground } from "./backgrounds/CyberBackground";
import { AnimatedLines } from "./backgrounds/AnimatedLines";
import { GlitchOverlay } from "./backgrounds/GlitchOverlay";

const features = [
  {
    title: "Guides",
    description: "Detailed guides on pop culture topics",
    icon: BookOpen,
    color: "text-[var(--theme-colors-cyber-plasma)]",
    gradient: "from-[#1A1F2C] to-[#221F26]",
    glowColor: "var(--theme-colors-cyber-plasma)" as CSSColor,
  },
  {
    title: "Updates",
    description: "Latest news and personal updates",
    icon: Rss,
    color: "text-[var(--theme-colors-cyber-tesla)]",
    gradient: "from-[#403E43] to-[#7E69AB]",
    glowColor: "var(--theme-colors-cyber-tesla)" as CSSColor,
  },
  {
    title: "Blog",
    description: "In-depth articles and opinions",
    icon: Newspaper,
    color: "text-[var(--theme-colors-cyber-electric)]",
    gradient: "from-[#221F26] to-[#403E43]",
    glowColor: "var(--theme-colors-cyber-electric)" as CSSColor,
  },
  {
    title: "Videos",
    description: "Video content and highlights",
    icon: Video,
    color: "text-[var(--theme-colors-cyber-tesla)]",
    gradient: "from-[#6E59A5] to-[#221F26]",
    glowColor: "var(--theme-colors-cyber-tesla)" as CSSColor,
  },
];

export const Features = () => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeGlowColor, setActiveGlowColor] = useState<CSSColor>("#1A1F2C");
  const containerRef = useRef<HTMLDivElement>(null);

  const glassStyle = {
    background: 'rgba(26, 31, 44, 0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(126, 105, 171, 0.1)',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <BackgroundContainer className="py-20 relative overflow-hidden bg-[radial-gradient(circle_at_center,#1f1f2e,#14141c)]">
      {/* Matrix Rain Effect - Primary */}
      <AnimatedLines 
        direction="vertical"
        color="#00ff00"
        speed={40}
        spacing={20}
        opacity={0.15}
      />
      
      {/* Matrix Rain Effect - Secondary */}
      <AnimatedLines 
        direction="vertical"
        color="#1affff"
        speed={20}
        spacing={25}
        opacity={0.1}
      />
      
      {/* Crossing Lines - Horizontal */}
      <AnimatedLines 
        direction="horizontal"
        color="var(--theme-colors-cyber-cyan)"
        speed={10}
        spacing={35}
        opacity={0.08}
      />
      
      {/* Base Cyber Background */}
      <CyberBackground 
        color="var(--theme-colors-cyber-purple)"
        opacity={0.15}
      />
      
      {/* Dynamic Glitch Effect */}
      <GlitchOverlay 
        intensity={0.3}
        frequency={1.8}
        color="var(--theme-colors-cyber-pink)"
      />
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Latest <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[var(--theme-colors-cyber-pink)] to-[var(--theme-colors-cyber-cyan)] animate-pulse">Content</span>
        </h2>
        
        {/* Cursor glow effect */}
        <div
          className="pointer-events-none fixed transition-transform duration-100 ease-out mix-blend-screen"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: '200px',
            height: '200px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${activeGlowColor}80 0%, transparent 70%)`,
            filter: 'blur(8px)',
            zIndex: 20,
          }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative cursor-pointer p-6 rounded-lg transition-all duration-500 hover:scale-112 hover:-translate-y-1"
              style={{
                ...glassStyle,
                '--hover-glow-color': feature.glowColor,
                boxShadow: `0 0 20px ${feature.glowColor}40`,
                transform: 'perspective(1000px)',
              } as React.CSSProperties}
              onMouseEnter={() => setActiveGlowColor(feature.glowColor)}
              onMouseLeave={() => setActiveGlowColor("#1A1F2C")}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"
                   style={{
                     background: `linear-gradient(135deg, ${feature.glowColor}40, transparent)`,
                   }} />
              
              {/* Holographic effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shine_3s_ease-in-out_infinite]"
                     style={{
                       transform: 'translateX(-100%)',
                       animation: 'shine 3s ease-in-out infinite',
                     }} />
              </div>
              
              <div className="relative z-10">
                <feature.icon
                  className={`h-12 w-12 ${feature.color} mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_8px_${feature.glowColor}]`}
                />
                <h3 className={`text-xl font-semibold mb-2 ${feature.color} transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackgroundContainer>
  );
};