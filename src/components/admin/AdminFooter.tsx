import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

export const AdminFooter = () => {
  const { currentTheme } = useTheme();
  const primaryColor = currentTheme?.configuration?.colors?.cyber?.pink?.DEFAULT || 'hsl(var(--primary))';
  
  return (
    <motion.footer 
      className="relative w-full h-32 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute inset-0 bg-[#1A1F2C] glass"
        style={{
          clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
          backgroundImage: `
            linear-gradient(135deg, 
              rgba(26, 31, 44, 0.9),
              rgba(26, 31, 44, 0.7)
            )
          `,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="glitch-grid" />
        </div>
      </div>
      
      <div className="relative h-full flex items-end justify-between px-8 pb-4">
        <div className="text-sm text-muted-foreground">
          © 2024 Admin Portal. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </div>
    </motion.footer>
  );
};