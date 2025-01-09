import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Authentication Overview</h3>
              <p>
                The authentication system provides secure user management with support for
                multiple authentication methods and role-based access control.
              </p>
              <h4>Features</h4>
              <ul>
                <li>Email/password authentication</li>
                <li>OAuth providers support</li>
                <li>Role-based authorization</li>
                <li>Session management</li>
                <li>Security logging</li>
              </ul>
            </TabsContent>

            <TabsContent value="roles" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Roles and Permissions</h3>
              <div className="space-y-4">
                <div>
                  <h4>Available Roles</h4>
                  <ul>
                    <li>Admin: Full system access</li>
                    <li>Moderator: Content management</li>
                    <li>User: Standard access</li>
                    <li>Guest: Limited access</li>
                  </ul>
                </div>
                <div>
                  <h4>Permission System</h4>
                  <p>Permissions are managed through:</p>
                  <ul>
                    <li>Role-based access control (RBAC)</li>
                    <li>Row Level Security (RLS)</li>
                    <li>Custom permission policies</li>
                    <li>Feature flags</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Implementation Guide</h3>
              <div className="space-y-4">
                <div>
                  <h4>Using Authentication</h4>
                  <pre><code>{`
// Import auth hooks
import { useAuthStore } from '@/store/useAuthStore';

// Use in components
const { user, signIn, signOut } = useAuthStore();

// Check user role
const { hasRole } = useRoleCheck(user, 'admin');
                  `}</code></pre>
                </div>
                <div>
                  <h4>Protected Routes</h4>
                  <p>Implement route protection with:</p>
                  <ul>
                    <li>Role-based route guards</li>
                    <li>Authentication middleware</li>
                    <li>Redirect handling</li>
                    <li>Loading states</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Security Best Practices</h3>
              <div className="space-y-4">
                <div>
                  <h4>Session Management</h4>
                  <ul>
                    <li>Secure session storage</li>
                    <li>Token refresh handling</li>
                    <li>Session timeout policies</li>
                    <li>Multi-device management</li>
                  </ul>
                </div>
                <div>
                  <h4>Security Measures</h4>
                  <ul>
                    <li>Password policies</li>
                    <li>Rate limiting</li>
                    <li>Activity logging</li>
                    <li>Security notifications</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};