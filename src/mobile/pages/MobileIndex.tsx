import { useTheme } from "@/hooks/useTheme";

const MobileIndex = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-background">
      <h1>Mobile Version Coming Soon</h1>
    </div>
  );
};

export default MobileIndex;