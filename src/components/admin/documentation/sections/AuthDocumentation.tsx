import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthDocumentationProps {
  data?: any;
}

export const AuthDocumentation = ({ data }: AuthDocumentationProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authorization System Documentation</CardTitle>
          <CardDescription>
            Guide to authentication, user roles, and permissions
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