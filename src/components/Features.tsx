import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { 
  Laptop,
  BarChart3,
  Calendar,
  Share2,
  MessageSquare,
  TrendingUp
} from "lucide-react";

export const Features = () => {
  const { currentTheme } = useTheme();
  const isMobile = useIsMobile();
  
  const features = [
    {
      icon: <Calendar className="w-8 h-8 md:w-6 md:h-6" />,
      title: "Schedule Posts",
      description: "Plan and schedule your content across multiple platforms"
    },
    {
      icon: <BarChart3 className="w-8 h-8 md:w-6 md:h-6" />,
      title: "Analytics",
      description: "Track performance and engagement across all channels"
    },
    {
      icon: <Share2 className="w-8 h-8 md:w-6 md:h-6" />,
      title: "Cross-Platform",
      description: "Manage all major social media platforms in one place"
    },
    {
      icon: <MessageSquare className="w-8 h-8 md:w-6 md:h-6" />,
      title: "Engagement",
      description: "Monitor and respond to comments and messages"
    },
    {
      icon: <Laptop className="w-8 h-8 md:w-6 md:h-6" />,
      title: "Content Creation",
      description: "Create and edit content with our built-in tools"
    },
    {
      icon: <TrendingUp className="w-8 h-8 md:w-6 md:h-6" />,
      title: "Growth Tools",
      description: "Leverage AI-powered insights to grow your audience"
    }
  ];

  return (
    <section className="py-8 md:py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-lines opacity-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-3 md:mb-4",
            "bg-clip-text text-transparent",
            "animate-fade-in"
          )}
          style={{
            backgroundImage: `linear-gradient(to right, ${currentTheme?.configuration?.colors?.cyber?.pink?.DEFAULT || '#ff007f'}, ${currentTheme?.configuration?.colors?.cyber?.cyan?.DEFAULT || '#00fff5'})`
          }}>
            Powerful Features
          </h2>
          <p className="text-lg md:text-xl text-gray-300/90 max-w-2xl mx-auto px-4 md:px-0">
            Everything you need to manage your social media presence effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "relative group",
                "p-6 md:p-8",
                "rounded-lg",
                "glass",
                "border border-white/10",
                "transition-all duration-300",
                "hover:border-white/20",
                "animate-fade-in",
                "active:scale-95 md:active:scale-100",
                isMobile ? "touch-pan-y active:bg-white/5" : "hover:-translate-y-1"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                background: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 md:p-3 rounded-lg",
                  "bg-gradient-to-br from-cyber-tesla to-cyber-plasma",
                  "shadow-lg"
                )}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-sm text-gray-300/80">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};