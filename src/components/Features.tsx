import { BookOpen, Newspaper, Rss, Video } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";

const features = [
  {
    title: "Guides",
    description: "Detailed guides on pop culture topics",
    icon: BookOpen,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-secondary)]/20",
  },
  {
    title: "Updates",
    description: "Latest news and personal updates",
    icon: Rss,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-accent)]/20",
  },
  {
    title: "Blog",
    description: "In-depth articles and opinions",
    icon: Newspaper,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-secondary)]/20",
  },
  {
    title: "Videos",
    description: "Video content and highlights",
    icon: Video,
    color: "text-[var(--theme-primary)]",
    gradient: "from-[var(--theme-primary)]/20 to-[var(--theme-accent)]/20",
  },
];

export const Features = () => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();
  
  const glassStyle = {
    background: effects?.glass?.background || 'rgba(255, 255, 255, 0.1)',
    backdropFilter: `blur(${effects?.glass?.blur || '8px'})`,
    border: effects?.glass?.border || '1px solid rgba(255, 255, 255, 0.1)',
    transition: `all ${effects?.animations?.timing?.normal || '200ms'} ${effects?.animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'}`,
  };

  const cardHoverStyle = {
    '--hover-scale': effects?.hover?.scale || '1.05',
    '--hover-lift': effects?.hover?.lift || '-4px',
    '--hover-glow': effects?.hover?.glow_strength || '10px',
    '--transition-duration': effects?.hover?.transition_duration || '300ms',
  } as React.CSSProperties;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Latest <span className="text-gradient animate-glow">Content</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group cursor-pointer p-6 rounded-lg transition-all"
              style={{
                ...glassStyle,
                ...cardHoverStyle,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-lg`} />
              <div className="relative z-10">
                <feature.icon
                  className={`h-12 w-12 ${feature.color} mb-4 transform transition-transform duration-[var(--transition-duration)] group-hover:scale-110`}
                />
                <h3 className={`text-xl font-semibold mb-2 ${feature.color} transition-colors duration-[var(--transition-duration)]`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-[var(--transition-duration)]">
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