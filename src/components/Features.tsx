import { BookOpen, Newspaper, Rss, Video } from "lucide-react";

const features = [
  {
    title: "Guides",
    description: "Detailed guides on pop culture topics",
    icon: BookOpen,
    color: "text-cyber-pink",
    gradient: "from-cyber-pink/20 to-cyber-purple/20",
  },
  {
    title: "Updates",
    description: "Latest news and personal updates",
    icon: Rss,
    color: "text-cyber-cyan",
    gradient: "from-cyber-cyan/20 to-cyber-purple/20",
  },
  {
    title: "Blog",
    description: "In-depth articles and opinions",
    icon: Newspaper,
    color: "text-cyber-purple",
    gradient: "from-cyber-purple/20 to-cyber-pink/20",
  },
  {
    title: "Videos",
    description: "Video content and highlights",
    icon: Video,
    color: "text-cyber-pink",
    gradient: "from-cyber-pink/20 to-cyber-cyan/20",
  },
];

export const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-cyber font-bold text-center mb-12">
          Latest <span className="text-gradient animate-glow">Content</span>
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
                <h3 className="text-xl font-cyber font-semibold mb-2 group-hover:text-gradient">
                  {feature.title}
                </h3>
                <p className="text-gray-300/90 group-hover:text-white transition-colors duration-300">
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