import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-cyber-dark via-cyber-dark/90 to-cyber-dark/80 z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default Index;