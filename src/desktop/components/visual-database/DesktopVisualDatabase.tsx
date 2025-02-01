import { useTheme } from "@/hooks/useTheme";

export const DesktopVisualDatabase = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="w-full h-[600px] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
      <div className="relative z-10 p-8">
        <h3 className="text-2xl font-bold mb-4">Visual Database</h3>
      </div>
    </div>
  );
};