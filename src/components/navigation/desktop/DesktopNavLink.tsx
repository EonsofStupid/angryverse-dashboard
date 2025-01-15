import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

// Soft cyberpunk colors for random selection
const TINT_COLORS = [
  'rgba(155, 135, 245, 0.1)', // Primary Purple
  'rgba(126, 105, 171, 0.1)', // Secondary Purple
  'rgba(110, 89, 165, 0.1)',  // Tertiary Purple
  'rgba(139, 92, 246, 0.1)',  // Vivid Purple
  'rgba(217, 70, 239, 0.1)',  // Magenta Pink
  'rgba(229, 222, 255, 0.1)', // Soft Purple
  'rgba(242, 252, 226, 0.1)', // Soft Green
  'rgba(255, 222, 226, 0.1)', // Soft Pink
  'rgba(211, 228, 253, 0.1)'  // Soft Blue
];

interface DesktopNavLinkProps {
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}

export const DesktopNavLink = ({ to, onClick, className, children }: DesktopNavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tintColor] = useState(() => 
    TINT_COLORS[Math.floor(Math.random() * TINT_COLORS.length)]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <Link 
      to={to} 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative font-semibold text-muted-foreground",
        "group cursor-pointer px-3 py-2",
        "hover:text-foreground transition-all duration-300",
        className
      )}
    >
      {children}
      <motion.span 
        className="absolute inset-0 -z-10 rounded-lg"
        initial={false}
        animate={{
          backgroundColor: isHovered ? tintColor : "rgba(255, 255, 255, 0)",
          backdropFilter: isHovered ? "blur(8px)" : "blur(0px)",
          scale: isHovered ? 1.05 : 1,
          borderRadius: isHovered ? "0.5rem" : "0rem",
          boxShadow: isHovered 
            ? "inset 0 0.5px 0.5px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(155, 135, 245, 0.2)" 
            : "none"
        }}
        transition={{ duration: 0.2 }}
        style={{
          transformOrigin: "center center",
          border: isHovered ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
        }}
      />
    </Link>
  );
};