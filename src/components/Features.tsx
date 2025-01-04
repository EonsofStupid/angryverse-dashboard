import { Twitch, Youtube, Facebook, Instagram } from "lucide-react";

const features = [
  {
    title: "Twitch Integration",
    description: "Manage your streams and chat engagement",
    icon: Twitch,
    color: "text-[#9146FF]",
  },
  {
    title: "YouTube Management",
    description: "Upload and schedule your video content",
    icon: Youtube,
    color: "text-[#FF0000]",
  },
  {
    title: "Facebook Posts",
    description: "Create and schedule your social updates",
    icon: Facebook,
    color: "text-[#1877F2]",
  },
  {
    title: "Instagram Stories",
    description: "Design and publish engaging stories",
    icon: Instagram,
    color: "text-[#E4405F]",
  },
];

export const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-cyber font-bold text-center mb-12">
          All Your <span className="text-gradient">Content</span> in One Place
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass p-6 rounded-lg hover-glow group transition-all duration-300 cursor-pointer"
            >
              <feature.icon
                className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              />
              <h3 className="text-xl font-cyber font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};