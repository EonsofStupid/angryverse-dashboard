import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ThemeDebugger } from "@/components/theme/ThemeDebugger";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-cyber-dark via-cyber-dark/90 to-cyber-dark/80 z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
      </div>
    </div>
  );
};

export default Index;