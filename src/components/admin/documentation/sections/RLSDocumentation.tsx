import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>RLS Overview</h3>
              <p>
                Row Level Security (RLS) provides fine-grained access control at the row level
                in your database tables. It ensures that users can only access the data they're
                authorized to see.
              </p>
              <h4>Key Benefits</h4>
              <ul>
                <li>Enhanced data security</li>
                <li>Granular access control</li>
                <li>Simplified application logic</li>
                <li>Reduced risk of data leaks</li>
              </ul>
            </TabsContent>

            <TabsContent value="policies" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>RLS Policies</h3>
              <div className="space-y-4">
                <div>
                  <h4>Policy Types</h4>
                  <ul>
                    <li>SELECT policies (read access)</li>
                    <li>INSERT policies (create access)</li>
                    <li>UPDATE policies (modify access)</li>
                    <li>DELETE policies (remove access)</li>
                  </ul>
                </div>
                <div>
                  <h4>Common Policy Patterns</h4>
                  <ul>
                    <li>Owner-only access</li>
                    <li>Role-based access</li>
                    <li>Organization-level access</li>
                    <li>Public/private visibility</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Implementing RLS</h3>
              <div className="space-y-4">
                <div>
                  <h4>Basic Setup</h4>
                  <pre><code>{`
-- Enable RLS on a table
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- Create a policy
CREATE POLICY "user_can_read_own_data" ON your_table
FOR SELECT
USING (auth.uid() = user_id);
                  `}</code></pre>
                </div>
                <div>
                  <h4>Best Practices</h4>
                  <ul>
                    <li>Always test policies thoroughly</li>
                    <li>Use consistent naming conventions</li>
                    <li>Document policy intentions</li>
                    <li>Regular security audits</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Example Policies</h3>
              <div className="space-y-4">
                <div>
                  <h4>User Profiles</h4>
                  <pre><code>{`
-- Users can read any profile
CREATE POLICY "profiles_public_read" ON profiles
FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "profiles_self_update" ON profiles
FOR UPDATE USING (auth.uid() = id);
                  `}</code></pre>
                </div>
                <div>
                  <h4>Posts System</h4>
                  <pre><code>{`
-- Public can read published posts
CREATE POLICY "posts_public_read" ON posts
FOR SELECT USING (status = 'published');

-- Authors can manage their own posts
CREATE POLICY "posts_author_all" ON posts
FOR ALL USING (auth.uid() = author_id);
                  `}</code></pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};