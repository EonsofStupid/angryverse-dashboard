import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteSettings } from "./SiteSettings";
import { ThemeSettings } from "./ThemeSettings";
import { PluginSettings } from "./PluginSettings";
import { SecuritySettings } from "./SecuritySettings";

export const Settings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gradient">Settings</h1>
      <Tabs defaultValue="site" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="plugins">Plugins</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="site">
          <SiteSettings />
        </TabsContent>
        <TabsContent value="theme">
          <ThemeSettings />
        </TabsContent>
        <TabsContent value="plugins">
          <PluginSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};