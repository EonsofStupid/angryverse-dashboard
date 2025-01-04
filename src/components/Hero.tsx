import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 cyber-gradient opacity-10 animate-glow" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-cyber font-bold leading-tight animate-float">
            Why Be The Best If{" "}
            <span className="text-gradient">No One Knows It?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Manage all your social media channels in one place. Create, schedule,
            and analyze your content across platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="cyber-gradient hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-glow border-cyber-cyan"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};