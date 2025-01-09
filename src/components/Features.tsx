import { BookOpen, Newspaper, Rss, Video } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";
import { useState, useRef, useEffect } from "react";

const features = [
  {
    title: "Guides",
    description: "Detailed guides on pop culture topics",
    icon: BookOpen,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-secondary)]/20",
    glowColor: "var(--theme-primary)",
  },
  {
    title: "Updates",
    description: "Latest news and personal updates",
    icon: Rss,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-accent)]/20",
    glowColor: "var(--theme-accent)",
  },
  {
    title: "Blog",
    description: "In-depth articles and opinions",
    icon: Newspaper,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-secondary)]/20",
    glowColor: "var(--theme-secondary)",
  },
  {
    title: "Videos",
    description: "Video content and highlights",
    icon: Video,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-accent)]/20",
    glowColor: "var(--theme-accent)",
  },
];

export const Features = () => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeGlowColor, setActiveGlowColor] = useState("var(--theme-primary)");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const glassStyle = {
    background: effects?.glass?.background || 'rgba(255, 255, 255, 0.1)',
    backdropFilter: `blur(${effects?.glass?.blur || '8px'})`,
    border: effects?.glass?.border || '1px solid rgba(255, 255, 255, 0.1)',
    transition: `all ${effects?.animations?.timing?.normal || '200ms'} ${effects?.animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'}`,
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
    <section className="py-20 relative overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Latest <span className="text-gradient animate-glow">Content</span>
        </h2>
        
        {/* Cursor glow effect */}
        <div
          className="pointer-events-none fixed transition-transform duration-100 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: '150px',
            height: '150px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${activeGlowColor}40 0%, transparent 70%)`,
            mixBlendMode: 'screen',
            zIndex: 10,
          }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group cursor-pointer p-6 rounded-lg transition-all hover:scale-105"
              style={glassStyle}
              onMouseEnter={() => setActiveGlowColor(feature.glowColor)}
              onMouseLeave={() => setActiveGlowColor("var(--theme-primary)")}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-lg`} />
              <div className="relative z-10">
                <feature.icon
                  className={`h-12 w-12 ${feature.color} mb-4 transform transition-transform duration-300 group-hover:scale-110`}
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
    </section>
  );
};