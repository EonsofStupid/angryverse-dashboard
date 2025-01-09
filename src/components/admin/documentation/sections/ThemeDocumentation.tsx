import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ThemeDocumentationProps {
  data?: any;
}

export const ThemeDocumentation = ({ data }: ThemeDocumentationProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme System Documentation</CardTitle>
          <CardDescription>
            Complete documentation of the theme system including effects, variables, and usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {data?.content?.description}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};