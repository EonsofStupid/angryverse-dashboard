import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const SiteSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch settings from Supabase
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      // Convert array of settings to an object for easier access
      return data.reduce((acc, setting) => ({
        ...acc,
        [setting.setting_key]: setting.setting_value
      }), {});
    }
  });

  // Update settings mutation
  const updateSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string, value: any }) => {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          category: 'general'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = (key: string, value: any) => {
    updateSetting.mutate({ key, value });
  };

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="reading">Reading</TabsTrigger>
        <TabsTrigger value="discussion">Discussion</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure basic site information and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="site-title">Site Title</Label>
              <Input
                id="site-title"
                defaultValue={settings?.['site_title']}
                onChange={(e) => handleSave('site_title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Site Description</Label>
              <Input
                id="site-description"
                defaultValue={settings?.['site_description']}
                onChange={(e) => handleSave('site_description', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reading">
        <Card>
          <CardHeader>
            <CardTitle>Reading Settings</CardTitle>
            <CardDescription>
              Configure how your content is displayed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="posts-per-page">Posts per page</Label>
              <Input
                id="posts-per-page"
                type="number"
                min="1"
                defaultValue={settings?.['posts_per_page'] || 10}
                onChange={(e) => handleSave('posts_per_page', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="discussion">
        <Card>
          <CardHeader>
            <CardTitle>Discussion Settings</CardTitle>
            <CardDescription>
              Configure how comments and discussions work
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Comments</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable comments on new posts
                </p>
              </div>
              <Switch
                checked={settings?.['allow_comments']}
                onCheckedChange={(checked) => handleSave('allow_comments', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Comment Moderation</Label>
                <p className="text-sm text-muted-foreground">
                  Require approval before comments are published
                </p>
              </div>
              <Switch
                checked={settings?.['moderate_comments']}
                onCheckedChange={(checked) => handleSave('moderate_comments', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="media">
        <Card>
          <CardHeader>
            <CardTitle>Media Settings</CardTitle>
            <CardDescription>
              Configure how media files are handled
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="max-upload-size">Maximum upload size (MB)</Label>
              <Input
                id="max-upload-size"
                type="number"
                min="1"
                defaultValue={settings?.['max_upload_size'] || 5}
                onChange={(e) => handleSave('max_upload_size', parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Optimize Images</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically optimize uploaded images
                </p>
              </div>
              <Switch
                checked={settings?.['optimize_images']}
                onCheckedChange={(checked) => handleSave('optimize_images', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seo">
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>
              Configure search engine optimization settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Default Meta Title</Label>
              <Input
                id="meta-title"
                defaultValue={settings?.['default_meta_title']}
                onChange={(e) => handleSave('default_meta_title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Default Meta Description</Label>
              <Input
                id="meta-description"
                defaultValue={settings?.['default_meta_description']}
                onChange={(e) => handleSave('default_meta_description', e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Open Graph</Label>
                <p className="text-sm text-muted-foreground">
                  Add Open Graph meta tags for social sharing
                </p>
              </div>
              <Switch
                checked={settings?.['enable_open_graph']}
                onCheckedChange={(checked) => handleSave('enable_open_graph', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};