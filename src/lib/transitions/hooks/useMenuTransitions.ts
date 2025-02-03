import { useState, useCallback } from "react";
import { type TransitionPreset, getTransitionPreset } from "../menu-transitions";
import { type MotionProps } from "framer-motion";

export const useMenuTransitions = (initialPreset: TransitionPreset = "slideIn") => {
  const [currentPreset, setCurrentPreset] = useState<TransitionPreset>(initialPreset);
  
  const getTransition = useCallback((): MotionProps => {
    return getTransitionPreset(currentPreset);
  }, [currentPreset]);
  
  const cyclePreset = useCallback(() => {
    const presets: TransitionPreset[] = ["slideIn", "fade", "glow", "glitch", "scan", "neon"];
    const currentIndex = presets.indexOf(currentPreset);
    const nextIndex = (currentIndex + 1) % presets.length;
    setCurrentPreset(presets[nextIndex]);
  }, [currentPreset]);
  
  return {
    currentPreset,
    setCurrentPreset,
    getTransition,
    cyclePreset,
  };
};