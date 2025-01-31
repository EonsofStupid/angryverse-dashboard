import { motion, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-[64px] left-0 right-0 h-[3px] z-50 bg-black/20"
      style={{
        backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(155, 135, 245, 0.1) 50%, transparent 100%)",
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-full origin-[0%] bg-[#9b87f5]"
        style={{ 
          scaleX: scrollYProgress,
          backgroundImage: "linear-gradient(90deg, #9b87f5, #7E69AB)",
        }}
      >
        {/* Cyber lines overlay */}
        <div className="absolute inset-0 bg-cyber-lines animate-cyber-lines opacity-30" />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0"
          style={{
            boxShadow: "0 0 10px #9b87f5, 0 0 20px #9b87f5",
          }}
        />
      </motion.div>
    </motion.div>
  );
};