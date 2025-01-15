import { useState, useCallback } from "react";

export const useNavAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsAnimating(true);
    setIsMenuOpen(prev => !prev);
  }, []);

  return {
    isAnimating,
    isMenuOpen,
    toggleMenu,
    setIsMenuOpen
  };
};