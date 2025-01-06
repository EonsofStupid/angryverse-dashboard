import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ThemeDebugger = () => {
  const { currentTheme, isLoading, error } = useTheme();

  if (isLoading) {
    return <div>Loading theme...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!currentTheme) {
    return <div>No theme loaded</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Current Theme: {currentTheme.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify(currentTheme, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};