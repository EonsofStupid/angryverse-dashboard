import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { Link } from "react-router-dom";

export const HeroContent = () => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {!user ? (
          // Public content
          <>
            <h1 className="text-4xl md:text-6xl font-cyber font-bold leading-tight animate-float">
              Why Be The Best If{" "}
              <span className="text-gradient animate-glow">No One Knows It?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300/90 backdrop-blur-sm">
              Manage all your social media channels in one place. Create, schedule,
              and analyze your content across platforms.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="glass bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan hover:from-cyber-pink/90 hover:to-cyber-cyan/90 transition-all duration-500 hover:scale-105 animate-glow"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass hover-glow border-cyber-cyan text-cyber-cyan hover:text-cyber-cyan/90 transition-all duration-500 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </>
        ) : (
          // Authenticated content
          <>
            <h1 className="text-4xl md:text-6xl font-cyber font-bold leading-tight animate-float">
              Welcome Back,{" "}
              <span className="text-gradient animate-glow">
                {user.email?.split('@')[0]}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300/90 backdrop-blur-sm">
              {isAdmin 
                ? "Manage your content and monitor platform performance."
                : "Create and schedule your content across platforms."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAdmin ? (
                <Link to="/admin">
                  <Button
                    size="lg"
                    className="glass bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan hover:from-cyber-pink/90 hover:to-cyber-cyan/90 transition-all duration-500 hover:scale-105 animate-glow"
                  >
                    Admin Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/portal">
                  <Button
                    size="lg"
                    className="glass bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan hover:from-cyber-pink/90 hover:to-cyber-cyan/90 transition-all duration-500 hover:scale-105 animate-glow"
                  >
                    Go to Portal
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};