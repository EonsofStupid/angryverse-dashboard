import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
              <TabsTrigger value="variables">Variables</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Theme System Overview</h3>
              <p>
                The theme system provides a flexible and powerful way to customize the visual appearance
                of your application. It supports:
              </p>
              <ul>
                <li>Multiple theme presets</li>
                <li>Page-specific themes</li>
                <li>Advanced visual effects</li>
                <li>Real-time theme switching</li>
                <li>Theme backups and versioning</li>
              </ul>
            </TabsContent>

            <TabsContent value="effects" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Available Effects</h3>
              <div className="space-y-4">
                <div>
                  <h4>Glass Effects</h4>
                  <p>
                    Glassmorphism effects with customizable blur, transparency, and border styles:
                  </p>
                  <ul>
                    <li>Frosted glass with variable blur levels</li>
                    <li>Tinted glass with custom colors</li>
                    <li>Reflective surfaces with dynamic highlights</li>
                    <li>Pattern overlays for added texture</li>
                  </ul>
                </div>
                <div>
                  <h4>Special Effects</h4>
                  <p>Advanced visual effects for unique UI elements:</p>
                  <ul>
                    <li>Neon glow effects</li>
                    <li>Matrix-style animations</li>
                    <li>Holographic overlays</li>
                    <li>Glitch effects</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variables" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Theme Variables</h3>
              <div className="space-y-4">
                <div>
                  <h4>Color System</h4>
                  <p>Core color variables that define your theme:</p>
                  <ul>
                    <li>--theme-primary: Primary brand color</li>
                    <li>--theme-secondary: Secondary accent color</li>
                    <li>--theme-background: Page background</li>
                    <li>--theme-foreground: Text and content</li>
                  </ul>
                </div>
                <div>
                  <h4>Effect Variables</h4>
                  <p>Customizable effect properties:</p>
                  <ul>
                    <li>--glass-blur: Blur intensity for glass effects</li>
                    <li>--glass-opacity: Transparency level</li>
                    <li>--glow-strength: Neon glow intensity</li>
                    <li>--animation-timing: Effect duration control</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Using the Theme System</h3>
              <div className="space-y-4">
                <div>
                  <h4>Basic Implementation</h4>
                  <p>To apply themes in your components:</p>
                  <pre><code>{`
// Import the theme hook
import { useTheme } from '@/hooks/useTheme';

// Use in your component
const { currentTheme } = useTheme();

// Apply theme classes
<div className="glass hover-glow">
  Your themed content
</div>
                  `}</code></pre>
                </div>
                <div>
                  <h4>Advanced Usage</h4>
                  <p>For dynamic theme manipulation:</p>
                  <ul>
                    <li>Use setCurrentTheme() to change themes</li>
                    <li>Implement theme transitions with CSS classes</li>
                    <li>Combine effects for unique visuals</li>
                    <li>Create custom theme presets</li>
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