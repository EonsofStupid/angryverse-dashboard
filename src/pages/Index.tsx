import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-dark/90 to-cyber-dark/80 z-0" />
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Index;