import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";
import { cn } from "@/lib/utils";

interface MatrixEffectProps {
  className?: string;
  speed?: number;
  density?: number;
  color?: string;
}

export const MatrixEffect = ({
  className,
  speed = 30,
  density = 0.1,
  color = "var(--theme-colors-cyber-matrix)",
}: MatrixEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${0.1 - density * 0.05})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > density) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, speed);
    return () => clearInterval(interval);
  }, [speed, density, color]);

  return (
    <canvas 
      ref={canvasRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        className
      )}
    />
  );
};