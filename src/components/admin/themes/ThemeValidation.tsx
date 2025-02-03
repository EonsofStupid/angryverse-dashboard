import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";

export const ThemeValidation = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Validation</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Theme validation UI will be implemented in next step */}
        </CardContent>
      </Card>
    </div>
  );
};