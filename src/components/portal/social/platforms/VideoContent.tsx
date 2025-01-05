import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VideoFeed } from "./components/VideoFeed";
import { PlatformConnectionCard } from "./components/PlatformConnectionCard";
import { toast } from "sonner";
import { VideoContent as VideoContentType, PlatformConnection } from "./types";

interface VideoPlatformContentProps {
  platform: string;
}

export const VideoPlatformContent = ({ platform }: VideoPlatformContentProps) => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [channelFeeds, setChannelFeeds] = useState<Record<string, VideoContentType[]>>({});

  // Fetch platform connections
  const { data: connections } = useQuery({
    queryKey: ["social-connections", platform],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_connections")
        .select("*")
        .eq("platform", platform)
        .eq("status", "active");

      if (error) {
        toast.error(`Failed to fetch ${platform} connections`);
        return [];
      }

      return data as PlatformConnection[];
    },
  });

  const handleInitialize = async (connectionId: string) => {
    setIsLoading((prev) => ({ ...prev, [connectionId]: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-platform-videos', {
        body: { platform, connectionId }
      });

      if (error) {
        console.error('Error initializing feed:', error);
        throw error;
      }

      if (!data?.videos) {
        throw new Error('No videos returned from the API');
      }

      setChannelFeeds((prev) => ({
        ...prev,
        [connectionId]: data.videos,
      }));

      toast.success("Channel feed initialized successfully");
    } catch (error) {
      console.error('Error initializing feed:', error);
      toast.error(`Failed to initialize ${platform} feed: ${error.message}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, [connectionId]: false }));
    }
  };

  const handleRefresh = (connectionId: string) => {
    handleInitialize(connectionId);
  };

  const handleClear = (connectionId: string) => {
    setChannelFeeds((prev) => {
      const newFeeds = { ...prev };
      delete newFeeds[connectionId];
      return newFeeds;
    });
    toast.success("Channel feed cleared");
  };

  const handleAddToPost = (video: VideoContentType) => {
    // This will be implemented in a future update
    toast.info("Add to post feature coming soon!");
  };

  if (!connections?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No {platform} channels connected. Connect a channel in the Social Connections section above.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {connections.map((connection) => (
        <div key={connection.id} className="space-y-4">
          <PlatformConnectionCard
            connection={connection}
            isLoading={isLoading[connection.id] || false}
            onInitialize={() => handleInitialize(connection.id)}
            onRefresh={() => handleRefresh(connection.id)}
            onClear={() => handleClear(connection.id)}
            hasContent={!!channelFeeds[connection.id]}
          />
          
          {channelFeeds[connection.id] && (
            <VideoFeed
              videos={channelFeeds[connection.id]}
              onAddToPost={handleAddToPost}
            />
          )}
        </div>
      ))}
    </div>
  );
};
