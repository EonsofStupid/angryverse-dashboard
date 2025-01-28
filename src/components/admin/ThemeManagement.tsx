import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemePresets } from "./themes/ThemePresets";
import { ActiveThemes } from "./themes/ActiveThemes";
import { ThemeBackups } from "./themes/ThemeBackups";
import { PageThemes } from "./themes/PageThemes";
import { TokenManagement } from "./themes/TokenManagement";
import { ThemeValidation } from "./themes/ThemeValidation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTheme } from "@/hooks/useTheme";
import { Loader2 } from "lucide-react";

export const ThemeManagement = () => {
  const { isLoading, error } = useTheme();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error Loading Theme Management</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Theme Management</h1>
      </div>
      
      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="active">Active Themes</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="pages">Page Themes</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          <TokenManagement />
        </TabsContent>

        <TabsContent value="active">
          <ActiveThemes />
        </TabsContent>

        <TabsContent value="presets">
          <ThemePresets />
        </TabsContent>

        <TabsContent value="pages">
          <PageThemes />
        </TabsContent>

        <TabsContent value="backups">
          <ThemeBackups />
        </TabsContent>

        <TabsContent value="validation">
          <ThemeValidation />
        </TabsContent>
      </Tabs>
    </div>
  );
};