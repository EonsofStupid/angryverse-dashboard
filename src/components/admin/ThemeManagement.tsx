import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemePresets } from "./themes/ThemePresets";
import { ActiveThemes } from "./themes/ActiveThemes";
import { ThemeBackups } from "./themes/ThemeBackups";
import { PageThemes } from "./themes/PageThemes";

export const ThemeManagement = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Theme Management</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Themes</TabsTrigger>
          <TabsTrigger value="presets">Theme Presets</TabsTrigger>
          <TabsTrigger value="pages">Page Themes</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
        </TabsList>

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
      </Tabs>
    </div>
  );
};