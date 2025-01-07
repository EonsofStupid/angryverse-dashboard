import { BookOpen, Newspaper, Rss, Video, Settings, Users, BarChart3, Share2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRoleCheck } from "@/hooks/useRoleCheck";

const getFeatures = (isAuthenticated: boolean, isAdmin: boolean) => {
  const baseFeatures = [
    {
      title: "Guides",
      description: "Detailed guides on pop culture topics",
      icon: BookOpen,
      color: "text-primary",
      gradient: "from-primary/20 to-secondary/20",
    },
    {
      title: "Updates",
      description: "Latest news and personal updates",
      icon: Rss,
      color: "text-primary",
      gradient: "from-primary/20 to-accent/20",
    },
  ];

  const userFeatures = [
    {
      title: "Social Sharing",
      description: "Schedule and manage your posts",
      icon: Share2,
      color: "text-primary",
      gradient: "from-primary/20 to-secondary/20",
    },
    {
      title: "Analytics",
      description: "Track your content performance",
      icon: BarChart3,
      color: "text-primary",
      gradient: "from-primary/20 to-accent/20",
    },
  ];

  const adminFeatures = [
    {
      title: "User Management",
      description: "Manage user accounts and roles",
      icon: Users,
      color: "text-primary",
      gradient: "from-primary/20 to-secondary/20",
    },
    {
      title: "Settings",
      description: "Configure platform settings",
      icon: Settings,
      color: "text-primary",
      gradient: "from-primary/20 to-accent/20",
    },
  ];

  if (!isAuthenticated) return baseFeatures;
  if (isAdmin) return [...userFeatures, ...adminFeatures];
  return userFeatures;
};

export const Features = () => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const features = getFeatures(!!user, isAdmin);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {user ? (
            <>Your <span className="text-gradient animate-glow">Features</span></>
          ) : (
            <>Latest <span className="text-gradient animate-glow">Content</span></>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass p-6 rounded-lg hover-glow group transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <feature.icon
                  className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-500`}
                />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient">
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