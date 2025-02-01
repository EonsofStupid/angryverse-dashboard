import { useTheme } from '@/hooks/useTheme';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';

interface CyberBackgroundProps {
  color?: string;
  opacity?: number;
  className?: string;
}

export const CyberBackground = ({ 
  color = 'var(--theme-colors-cyber-purple)',
  opacity = 0.05,
  className = '' 
}: CyberBackgroundProps) => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();

  return (
    <div 
      className={`absolute inset-0 bg-cyber-lines animate-cyber-lines ${className}`}
      style={{
        '--cyber-line-color': color,
        '--cyber-line-opacity': opacity,
        transition: `all ${effects?.animations?.timing?.normal || '300ms'} ${effects?.animations?.curves?.ease_out || 'cubic-bezier(0.4, 0, 0.2, 1)'}`,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-noise opacity-20" />
    </div>
  );
};