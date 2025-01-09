import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RLSDocumentationProps {
  data?: any;
}

export const RLSDocumentation = ({ data }: RLSDocumentationProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>RLS Policies Documentation</CardTitle>
          <CardDescription>
            Comprehensive guide to Row Level Security policies and table access patterns
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