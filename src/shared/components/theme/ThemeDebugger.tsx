import { useTheme } from "@/hooks/useTheme";

export const ThemeDebugger = () => {
  const { currentTheme } = useTheme();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-background/80 backdrop-blur rounded-lg max-w-sm max-h-96 overflow-auto">
      <h3 className="font-bold mb-2">Theme Debug</h3>
      <pre className="text-xs">
        {JSON.stringify(currentTheme, null, 2)}
      </pre>
    </div>
  );
};