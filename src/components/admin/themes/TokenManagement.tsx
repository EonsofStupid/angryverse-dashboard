import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Paintbrush, Save, Undo } from "lucide-react";
import type { CSSColor } from "@/types/theme/utils/css";

const defaultCyberColors: {
  dark: CSSColor;
  pink: {
    DEFAULT: CSSColor;
    hover: CSSColor;
  };
  cyan: {
    DEFAULT: CSSColor;
    hover: CSSColor;
  };
  purple: CSSColor;
  green: {
    DEFAULT: CSSColor;
    hover: CSSColor;
  };
  yellow: {
    DEFAULT: CSSColor;
    hover: CSSColor;
  };
} = {
  dark: "#1a1b26" as CSSColor,
  pink: {
    DEFAULT: "#ff007f" as CSSColor,
    hover: "#ff1a8c" as CSSColor
  },
  cyan: {
    DEFAULT: "#00fff5" as CSSColor,
    hover: "#1affff" as CSSColor
  },
  purple: "#7928ca" as CSSColor,
  green: {
    DEFAULT: "#4ade80" as CSSColor,
    hover: "#22c55e" as CSSColor
  },
  yellow: {
    DEFAULT: "#fde047" as CSSColor,
    hover: "#facc15" as CSSColor
  }
};

const defaultTypography = {
  fonts: {
    sans: ['Inter', 'sans-serif'],
    cyber: ['Inter', 'sans-serif']
  }
};

export const TokenManagement = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("colors");
  const [colorTokens, setColorTokens] = useState(
    currentTheme?.configuration?.colors?.cyber || defaultCyberColors
  );
  const [typographyTokens, setTypographyTokens] = useState(
    currentTheme?.configuration?.typography || defaultTypography
  );
  const [isDirty, setIsDirty] = useState(false);

  const handleColorChange = (key: string, subKey: string | null, value: string) => {
    setIsDirty(true);
    setColorTokens(prev => {
      if (subKey) {
        return {
          ...prev,
          [key]: {
            ...(prev[key] as object),
            [subKey]: value as CSSColor
          }
        };
      }
      return {
        ...prev,
        [key]: value as CSSColor
      };
    });
  };

  const handleTypographyChange = (fontType: string, value: string) => {
    setIsDirty(true);
    setTypographyTokens(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [fontType]: value.split(',').map(font => font.trim())
      }
    }));
  };

  const handleSave = () => {
    if (!currentTheme) return;
    
    const updatedTheme = {
      ...currentTheme,
      configuration: {
        ...currentTheme.configuration,
        colors: {
          ...currentTheme.configuration.colors,
          cyber: colorTokens
        },
        typography: typographyTokens
      }
    };
    
    setCurrentTheme(updatedTheme);
    setIsDirty(false);
  };

  const handleReset = () => {
    setColorTokens(currentTheme?.configuration?.colors?.cyber || defaultCyberColors);
    setTypographyTokens(currentTheme?.configuration?.typography || defaultTypography);
    setIsDirty(false);
  };

  const renderColorInput = (key: string, value: any, parentKey?: string) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="space-y-4 border rounded-lg p-4">
          <h4 className="font-medium text-lg capitalize">{key}</h4>
          {Object.entries(value).map(([subKey, subValue]) => 
            renderColorInput(subKey, subValue, key)
          )}
        </div>
      );
    }

    return (
      <div key={key} className="grid gap-2">
        <Label className="capitalize">
          {parentKey ? `${parentKey} - ${key}` : key}
        </Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={value}
            className="w-16 h-10 p-1"
            onChange={(e) => handleColorChange(parentKey || key, parentKey ? key : null, e.target.value)}
          />
          <Input
            type="text"
            value={value}
            className="flex-1"
            onChange={(e) => handleColorChange(parentKey || key, parentKey ? key : null, e.target.value)}
          />
          <div 
            className="w-10 h-10 rounded border"
            style={{ backgroundColor: value }}
          />
        </div>
      </div>
    );
  };

  const renderTypographyInput = (fontType: string, value: string[]) => (
    <div key={fontType} className="grid gap-2">
      <Label className="capitalize">{fontType} Font Family</Label>
      <Input
        type="text"
        value={value.join(', ')}
        onChange={(e) => handleTypographyChange(fontType, e.target.value)}
        placeholder="Font family names, comma-separated"
        className="font-mono"
      />
      <div className="text-sm text-muted-foreground">
        Preview: <span style={{ fontFamily: value.join(', ') }}>The quick brown fox jumps over the lazy dog</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Token Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
              <TabsTrigger value="animations">Animations</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Color Tokens</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={!isDirty}
                    >
                      <Undo className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={!isDirty}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isDirty && (
                    <Alert>
                      <Paintbrush className="h-4 w-4" />
                      <AlertDescription>
                        You have unsaved changes. Don't forget to save!
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-6">
                    {Object.entries(colorTokens).map(([key, value]) => 
                      renderColorInput(key, value)
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Typography Tokens</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={!isDirty}
                    >
                      <Undo className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={!isDirty}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isDirty && (
                    <Alert>
                      <Paintbrush className="h-4 w-4" />
                      <AlertDescription>
                        You have unsaved changes. Don't forget to save!
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-6">
                    {Object.entries(typographyTokens.fonts).map(([fontType, value]) => 
                      renderTypographyInput(fontType, value)
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Effect Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Effects token management UI will be implemented in next step */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="animations" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Animation Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Animation token management UI will be implemented in next step */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spacing" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Spacing Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Spacing token management UI will be implemented in next step */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};