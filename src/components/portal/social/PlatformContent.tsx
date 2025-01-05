import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface PlatformContentProps {
  platform: string;
}

interface PlatformPost {
  id: string;
  title?: string;
  content?: string;
  thumbnail_url?: string;
  platform_post_id: string;
  featured: boolean;
  engagement_metrics: {
    likes?: number;
    views?: number;
    comments?: number;
    shares?: number;
  };
  posted_at: string;
}

export const PlatformContent = ({ platform }: PlatformContentProps) => {
  const queryClient = useQueryClient();
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["platform-posts", platform],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_posts")
        .select("*")
        .eq("platform", platform)
        .order("posted_at", { ascending: false });

      if (error) {
        toast.error(`Failed to fetch ${platform} posts`);
        return [];
      }

      return data as PlatformPost[];
    },
  });

  const toggleFeatureMutation = useMutation({
    mutationFn: async (postIds: string[]) => {
      const { error } = await supabase
        .from("platform_posts")
        .update({ featured: true })
        .in("id", postIds);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-posts"] });
      toast.success("Posts featured successfully");
      setSelectedPosts([]);
    },
    onError: () => {
      toast.error("Failed to feature posts");
    },
  });

  const handleToggleSelect = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleFeatureSelected = () => {
    if (selectedPosts.length === 0) {
      toast.error("Please select posts to feature");
      return;
    }
    toggleFeatureMutation.mutate(selectedPosts);
  };

  if (isLoading) {
    return <div>Loading {platform} content...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {platform.charAt(0).toUpperCase() + platform.slice(1)} Content
        </h3>
        <Button
          onClick={handleFeatureSelected}
          disabled={selectedPosts.length === 0}
        >
          Feature Selected
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <Card key={post.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">
                  {post.title || "Post " + post.platform_post_id}
                </CardTitle>
                <Checkbox
                  id={`select-${post.id}`}
                  checked={selectedPosts.includes(post.id)}
                  onCheckedChange={() => handleToggleSelect(post.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {post.thumbnail_url && (
                <img
                  src={post.thumbnail_url}
                  alt="Post thumbnail"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-sm text-muted-foreground mb-2">
                {post.content}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {post.engagement_metrics.likes && (
                  <span>{post.engagement_metrics.likes} likes</span>
                )}
                {post.engagement_metrics.views && (
                  <span>{post.engagement_metrics.views} views</span>
                )}
                {post.engagement_metrics.comments && (
                  <span>{post.engagement_metrics.comments} comments</span>
                )}
              </div>
              {post.featured && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                  Featured
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};