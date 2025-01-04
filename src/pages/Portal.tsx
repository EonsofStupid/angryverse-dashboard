import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const Portal = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-cyber-dark via-cyber-dark/90 to-cyber-dark/80 z-0" />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Features />
        </div>
      </div>
    </div>
  );
};

export default Portal;