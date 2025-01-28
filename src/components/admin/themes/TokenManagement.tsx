import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";

export const TokenManagement = () => {
  const { currentTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("colors");

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
                <CardHeader>
                  <CardTitle>Color Tokens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Color token management UI will be implemented in next step */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Typography Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Typography token management UI will be implemented in next step */}
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