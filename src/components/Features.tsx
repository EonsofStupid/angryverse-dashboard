import { Twitch, Youtube, Facebook, Instagram } from "lucide-react";

const features = [
  {
    title: "Twitch Integration",
    description: "Manage your streams and chat engagement",
    icon: Twitch,
    color: "text-[#9146FF]",
    gradient: "from-[#9146FF]/20 to-cyber-purple/20",
  },
  {
    title: "YouTube Management",
    description: "Upload and schedule your video content",
    icon: Youtube,
    color: "text-[#FF0000]",
    gradient: "from-[#FF0000]/20 to-cyber-pink/20",
  },
  {
    title: "Facebook Posts",
    description: "Create and schedule your social updates",
    icon: Facebook,
    color: "text-[#1877F2]",
    gradient: "from-[#1877F2]/20 to-cyber-cyan/20",
  },
  {
    title: "Instagram Stories",
    description: "Design and publish engaging stories",
    icon: Instagram,
    color: "text-[#E4405F]",
    gradient: "from-[#E4405F]/20 to-cyber-pink/20",
  },
];

export const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-cyber font-bold text-center mb-12">
          All Your <span className="text-gradient animate-glow">Content</span> in One Place
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
                <h3 className="text-xl font-cyber font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};