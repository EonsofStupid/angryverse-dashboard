import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useState, useMemo } from "react";

// Vibrant cyberpunk colors from the theme
const THEME_COLORS = [
  'rgba(139, 92, 246, 0.2)', // Vivid Purple
  'rgba(217, 70, 239, 0.2)', // Magenta Pink
  'rgba(249, 115, 22, 0.2)', // Bright Orange
  'rgba(14, 165, 233, 0.2)', // Ocean Blue
  'rgba(255, 0, 127, 0.2)',  // Cyber Pink
  'rgba(0, 255, 245, 0.2)',  // Cyber Cyan
  'rgba(121, 40, 202, 0.2)'  // Cyber Purple
];

// Get 4-5 random colors from the theme
const getRandomColors = () => {
  const shuffled = [...THEME_COLORS].sort(() => 0.5 - Math.random());
  const numColors = Math.floor(Math.random() * 2) + 4; // Random number between 4-5
  return shuffled.slice(0, numColors);
};

interface DesktopNavLinkProps {
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}

export const DesktopNavLink = ({ to, onClick, className, children }: DesktopNavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = useMemo(() => getRandomColors(), []); // Generate colors once per instance

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const gradientBackground = `linear-gradient(45deg, ${colors.join(', ')})`;

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
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
          background: isHovered ? gradientBackground : "transparent",
          backdropFilter: isHovered ? "blur(8px)" : "blur(0px)",
          borderRadius: isHovered ? "0.5rem" : "0rem",
          boxShadow: isHovered 
            ? "inset 0 0.5px 0.5px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(155, 135, 245, 0.4)" 
            : "none"
        }}
        transition={{ duration: 0.2 }}
        style={{
          transformOrigin: "center center",
          border: isHovered ? "1px solid rgba(255, 255, 255, 0.2)" : "none"
        }}
      />
    </Link>
  );
};