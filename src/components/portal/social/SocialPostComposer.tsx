import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

export const SocialPostComposer = () => {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: connections, isLoading: isLoadingConnections } = useQuery({
    queryKey: ["social-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_connections")
        .select("*")
        .eq("status", "active");

      if (error) throw error;
      return data;
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async ({ content, platforms }: { content: string; platforms: string[] }) => {
      // First create the main social post
      const { data: socialPost, error: socialPostError } = await supabase
        .from("social_posts")
        .insert([{ content }])
        .select()
        .single();

      if (socialPostError) throw socialPostError;

      // Then create platform-specific posts
      const platformPosts = platforms.map((platform) => ({
        social_post_id: socialPost.id,
        platform,
      }));

      const { error: platformPostsError } = await supabase
        .from("platform_posts")
        .insert(platformPosts);

      if (platformPostsError) throw platformPostsError;

      return socialPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-posts"] });
      toast.success("Post created successfully");
      setContent("");
      setSelectedPlatforms([]);
    },
    onError: (error) => {
      toast.error("Failed to create post");
      console.error("Error creating post:", error);
    },
  });

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((p) => p !== platform)
        : [...current, platform]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }
    createPostMutation.mutate({ content, platforms: selectedPlatforms });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Share to</Label>
            <div className="flex flex-wrap gap-4">
              {[
                { platform: "facebook", icon: Facebook, color: "text-blue-600" },
                { platform: "instagram", icon: Instagram, color: "text-pink-600" },
                { platform: "twitter", icon: Twitter, color: "text-blue-400" },
                { platform: "linkedin", icon: Linkedin, color: "text-blue-700" },
                { platform: "youtube", icon: Youtube, color: "text-red-600" },
              ].map(({ platform, icon: Icon, color }) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => handlePlatformToggle(platform)}
                  />
                  <Label
                    htmlFor={platform}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                    <span className="capitalize">{platform}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button type="button" variant="outline" className="w-[120px]">
              <ImageIcon className="mr-2 h-4 w-4" />
              Add Media
            </Button>
            <Button 
              type="submit" 
              className="w-[120px]"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};