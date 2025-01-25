import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "relative mt-20 w-full min-h-[200px]",
        "before:absolute before:top-0 before:left-0 before:w-full before:h-full",
        "before:bg-[#1A1F2C] before:transform before:skew-y-[-2deg]",
        "before:glass before:z-[-1]",
        "after:absolute after:inset-0 after:bg-grid-white/[0.02]",
        "flex flex-col items-center justify-center gap-8 text-white/80"
      )}
    >
      <div className="flex items-center gap-8">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Twitter className="w-6 h-6" />
        </a>
      </div>
      
      <div className="text-sm">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};