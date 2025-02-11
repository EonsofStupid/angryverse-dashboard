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
import { useAuthStore } from "@/store/useAuthStore";
import { SocialConnection } from "@/types/social";

export const SocialPostComposer = () => {
  const [content, setContent] = useState("");
  const [selectedConnections, setSelectedConnections] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: connections, isLoading: isLoadingConnections } = useQuery({
    queryKey: ["social-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_connections")
        .select("*")
        .eq("status", "active");

      if (error) throw error;
      return data as SocialConnection[];
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async ({ content, connectionIds }: { content: string; connectionIds: string[] }) => {
      if (!user) throw new Error("User not authenticated");

      // First create the main social post
      const { data: socialPost, error: socialPostError } = await supabase
        .from("social_posts")
        .insert([{ 
          content,
          user_id: user.id 
        }])
        .select()
        .single();

      if (socialPostError) throw socialPostError;

      // Then create platform-specific posts for each selected connection
      const selectedConnections = connections?.filter(conn => connectionIds.includes(conn.id)) || [];
      const platformPosts = selectedConnections.map((connection) => ({
        social_post_id: socialPost.id,
        platform: connection.platform,
        status: 'pending'
      }));

      if (platformPosts.length > 0) {
        const { error: platformPostsError } = await supabase
          .from("platform_posts")
          .insert(platformPosts);

        if (platformPostsError) throw platformPostsError;
      }

      return socialPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-posts"] });
      toast.success("Post created successfully");
      setContent("");
      setSelectedConnections([]);
    },
    onError: (error) => {
      toast.error("Failed to create post");
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }
    if (selectedConnections.length === 0) {
      toast.error("Please select at least one platform to post to");
      return;
    }
    createPostMutation.mutate({ content, connectionIds: selectedConnections });
  };

  const platformIcons = {
    facebook: { icon: Facebook, color: "text-blue-600" },
    instagram: { icon: Instagram, color: "text-pink-600" },
    twitter: { icon: Twitter, color: "text-blue-400" },
    linkedin: { icon: Linkedin, color: "text-blue-700" },
    youtube: { icon: Youtube, color: "text-red-600" },
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections?.map((connection) => {
                const platform = platformIcons[connection.platform as keyof typeof platformIcons];
                if (!platform) return null;
                
                const Icon = platform.icon;
                return (
                  <div key={connection.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={connection.id}
                      checked={selectedConnections.includes(connection.id)}
                      onCheckedChange={(checked) => {
                        setSelectedConnections(prev =>
                          checked
                            ? [...prev, connection.id]
                            : prev.filter(id => id !== connection.id)
                        );
                      }}
                    />
                    <Label
                      htmlFor={connection.id}
                      className="flex items-center space-x-2 cursor-pointer flex-1"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${platform.color}`} />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {connection.connection_name || connection.platform_username}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {connection.account_type}
                          </span>
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
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