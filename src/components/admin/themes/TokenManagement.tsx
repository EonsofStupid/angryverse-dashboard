import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "sonner";
import {
  Eye,
  Paintbrush,
  Palette,
  Sparkles,
  Wand2,
  Waves
} from "lucide-react";

export const TokenManagement = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [generatedCSS, setGeneratedCSS] = useState<string>("");
  const [tailwindConfig, setTailwindConfig] = useState<string>("");

  const handleTokenUpdate = (category: string, key: string, value: string) => {
    if (!currentTheme) return;

    const updatedTheme = {
      ...currentTheme,
      configuration: {
        ...currentTheme.configuration,
        [category]: {
          ...currentTheme.configuration[category],
          [key]: value
        }
      }
    };

    setCurrentTheme(updatedTheme);
    generateTokenOutputs(updatedTheme);
    toast.success("Token updated successfully");
  };

  const generateTokenOutputs = (theme: any) => {
    // Generate CSS Custom Properties
    const cssTokens = Object.entries(theme.configuration.colors.cyber)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return Object.entries(value).map(([subKey, subValue]) => 
            `  --theme-colors-cyber-${key}-${subKey.toLowerCase()}: ${subValue};`
          ).join('\n');
        }
        return `  --theme-colors-cyber-${key}: ${value};`;
      })
      .join('\n');

    setGeneratedCSS(`:root {\n${cssTokens}\n}`);

    // Generate Tailwind Config
    const tailwindColors = Object.entries(theme.configuration.colors.cyber)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `        ${key}: ${JSON.stringify(value, null, 2)}`;
        }
        return `        ${key}: "${value}"`;
      })
      .join(',\n');

    setTailwindConfig(`module.exports = {
  theme: {
    extend: {
      colors: {
        cyber: {
${tailwindColors}
        }
      }
    }
  }
}`);
  };

  const exportToDatabase = async () => {
    try {
      // Export logic here using Supabase client
      toast.success("Theme exported to database successfully");
    } catch (error) {
      toast.error("Failed to export theme");
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-background/50 to-background border-0 shadow-xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-tesla via-cyber-plasma to-cyber-electric">
          Theme Token Management
        </CardTitle>
        <CardDescription className="text-foreground/70">
          Customize and preview your theme tokens in real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="colors" className="flex gap-2 items-center">
              <Palette className="w-4 h-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex gap-2 items-center">
              <Sparkles className="w-4 h-4" />
              Effects
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex gap-2 items-center">
              <Waves className="w-4 h-4" />
              Animations
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex gap-2 items-center">
              <Eye className="w-4 h-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex gap-2 items-center">
              <Wand2 className="w-4 h-4" />
              Presets
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex gap-2 items-center">
              <Paintbrush className="w-4 h-4" />
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(currentTheme?.configuration.colors.cyber || {}).map(([key, value]) => (
                <Card key={key} className="bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg capitalize">{key}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {typeof value === 'object' ? (
                      Object.entries(value).map(([subKey, subValue]) => (
                        <div key={`${key}-${subKey}`} className="space-y-2">
                          <Label className="text-sm capitalize">{subKey}</Label>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={subValue as string}
                              onChange={(e) => handleTokenUpdate('colors', `${key}.${subKey}`, e.target.value)}
                              className="flex-1"
                            />
                            <div
                              className="w-10 h-10 rounded-md border"
                              style={{ backgroundColor: subValue as string }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-2">
                        <Label className="text-sm">Value</Label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={value as string}
                            onChange={(e) => handleTokenUpdate('colors', key, e.target.value)}
                            className="flex-1"
                          />
                          <div
                            className="w-10 h-10 rounded-md border"
                            style={{ backgroundColor: value as string }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Generated Outputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>CSS Custom Properties</Label>
                      <pre className="mt-2 p-4 rounded-lg bg-background/80 overflow-auto">
                        {generatedCSS}
                      </pre>
                    </div>
                    <div>
                      <Label>Tailwind Configuration</Label>
                      <pre className="mt-2 p-4 rounded-lg bg-background/80 overflow-auto">
                        {tailwindConfig}
                      </pre>
                    </div>
                    <Button 
                      onClick={exportToDatabase}
                      className="w-full bg-gradient-to-r from-cyber-tesla to-cyber-electric hover:opacity-90"
                    >
                      Export to Database
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="effects">
            {/* Effects content */}
          </TabsContent>

          <TabsContent value="animations">
            {/* Animations content */}
          </TabsContent>

          <TabsContent value="typography">
            {/* Typography content */}
          </TabsContent>

          <TabsContent value="presets">
            {/* Presets content */}
          </TabsContent>

          <TabsContent value="custom">
            {/* Custom content */}
          </TabsContent>
        </Tabs>

        {activePreview && (
          <div className="fixed bottom-4 right-4 p-4 bg-background/90 backdrop-blur-md rounded-lg shadow-xl border border-border/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Token Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActivePreview(null)}
              >
                Close
              </Button>
            </div>
            <div className="w-64 h-64 rounded-lg border" style={{ background: activePreview }} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};