import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { VideoContent, PlatformConnection } from "./types";
import { VideoFeed } from "./components/VideoFeed";
import { PlatformConnectionCard } from "./components/PlatformConnectionCard";
import { Json } from "@/integrations/supabase/types";

interface VideoContentProps {
  platform: string;
}

export const VideoPlatformContent = ({ platform }: VideoContentProps) => {
  const queryClient = useQueryClient();
  const [activeFeeds, setActiveFeeds] = useState<Record<string, VideoContent[]>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const { data: connections } = useQuery({
    queryKey: ["social-connections", platform],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_connections")
        .select("*")
        .eq("platform", platform)
        .eq("status", "active");

      if (error) throw error;
      return data as PlatformConnection[];
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (video: VideoContent) => {
      const { data: post, error: postError } = await supabase
        .from("posts")
        .insert([
          {
            title: video.title,
            content: video.description,
            status: "published",
          },
        ])
        .select()
        .single();

      if (postError) throw postError;

      const platformPost = {
        platform,
        platform_post_id: video.platformId,
        status: "published",
        posted_at: video.publishedAt,
        engagement_metrics: video.metrics as unknown as Json,
        featured: true,
      };

      const { error: platformError } = await supabase
        .from("platform_posts")
        .insert([platformPost]);

      if (platformError) throw platformError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-posts"] });
      toast.success("Video added to posts successfully");
    },
    onError: () => {
      toast.error("Failed to add video to posts");
    },
  });

  const handleInitialize = async (connectionId: string) => {
    setIsLoading(prev => ({ ...prev, [connectionId]: true }));
    
    try {
      // Here we'll call the appropriate platform's API via edge function
      // For now, using mock data
      const mockVideos: VideoContent[] = [
        {
          id: "1",
          title: "Sample Video",
          description: "This is a sample video description",
          thumbnailUrl: "https://picsum.photos/seed/1/400/225",
          publishedAt: new Date().toISOString(),
          metrics: {
            views: 1000,
            likes: 100,
            comments: 50,
          },
          platformId: "vid1",
          url: "https://example.com/video1",
        },
      ];

      setActiveFeeds(prev => ({
        ...prev,
        [connectionId]: mockVideos,
      }));
    } catch (error) {
      toast.error("Failed to initialize feed");
      console.error("Error initializing feed:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, [connectionId]: false }));
    }
  };

  const handleRefresh = async (connectionId: string) => {
    setIsLoading(prev => ({ ...prev, [connectionId]: true }));
    
    try {
      // Here we'll refresh the feed from the platform's API
      await handleInitialize(connectionId);
      toast.success("Feed refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh feed");
    } finally {
      setIsLoading(prev => ({ ...prev, [connectionId]: false }));
    }
  };

  const handleClear = (connectionId: string) => {
    setActiveFeeds(prev => {
      const newFeeds = { ...prev };
      delete newFeeds[connectionId];
      return newFeeds;
    });
    toast.success("Feed cleared successfully");
  };

  if (!connections?.length) {
    return (
      <Alert>
        <AlertDescription>
          No {platform} connections found. Connect an account in the Social Connections section above.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {connections.map((connection) => (
        <AccordionItem key={connection.id} value={connection.id}>
          <AccordionTrigger>
            <PlatformConnectionCard
              connection={connection}
              isLoading={isLoading[connection.id] || false}
              onInitialize={() => handleInitialize(connection.id)}
              onRefresh={() => handleRefresh(connection.id)}
              onClear={() => handleClear(connection.id)}
              hasContent={!!activeFeeds[connection.id]}
            />
          </AccordionTrigger>
          <AccordionContent>
            {activeFeeds[connection.id] && (
              <VideoFeed
                videos={activeFeeds[connection.id]}
                onAddToPost={(video) => createPostMutation.mutate(video)}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};