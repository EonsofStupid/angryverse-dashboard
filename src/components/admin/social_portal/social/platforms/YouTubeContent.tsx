import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Youtube, Loader2, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";

interface YouTubeConnection {
  id: string;
  connection_name: string;
  platform_username: string;
  avatar_url: string | null;
}

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  published_at: string;
  statistics: {
    views: number;
    likes: number;
    comments: number;
  };
}

interface YouTubeChannelFeed {
  connection_id: string;
  videos: YouTubeVideo[];
  lastFetched: Date;
}

export const YouTubeContent = () => {
  const queryClient = useQueryClient();
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [channelFeeds, setChannelFeeds] = useState<Record<string, YouTubeChannelFeed>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  // Fetch YouTube connections
  const { data: connections } = useQuery({
    queryKey: ["social-connections", "youtube"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_connections")
        .select("id, connection_name, platform_username, avatar_url")
        .eq("platform", "youtube")
        .eq("status", "active");

      if (error) {
        toast.error("Failed to fetch YouTube connections");
        return [];
      }

      return data as YouTubeConnection[];
    },
  });

  const initializeChannelMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      setIsLoading((prev) => ({ ...prev, [connectionId]: true }));
      
      // Here you would typically make a call to your edge function that handles
      // YouTube API authentication and data fetching
      // For now, we'll simulate the response
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulated response - in production, this would come from the YouTube API
      const mockVideos: YouTubeVideo[] = [
        {
          id: "video1",
          title: "Sample Video 1",
          description: "This is a sample video description",
          thumbnail_url: "https://via.placeholder.com/320x180",
          published_at: new Date().toISOString(),
          statistics: {
            views: 1000,
            likes: 100,
            comments: 50,
          },
        },
        // Add more mock videos as needed
      ];

      setChannelFeeds((prev) => ({
        ...prev,
        [connectionId]: {
          connection_id: connectionId,
          videos: mockVideos,
          lastFetched: new Date(),
        },
      }));

      return mockVideos;
    },
    onSuccess: () => {
      toast.success("Channel feed initialized successfully");
      setIsConfirmOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to initialize channel feed");
      console.error("Error initializing channel:", error);
    },
    onSettled: (_, __, connectionId) => {
      setIsLoading((prev) => ({ ...prev, [connectionId]: false }));
    },
  });

  const clearChannelFeed = (connectionId: string) => {
    setChannelFeeds((prev) => {
      const newFeeds = { ...prev };
      delete newFeeds[connectionId];
      return newFeeds;
    });
    toast.success("Channel feed cleared");
  };

  const handleInitialize = (connectionId: string) => {
    setSelectedConnection(connectionId);
    setIsConfirmOpen(true);
  };

  const confirmInitialize = () => {
    if (selectedConnection) {
      initializeChannelMutation.mutate(selectedConnection);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">YouTube Channels</h2>
      </div>

      {connections?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              No YouTube channels connected. Connect a channel in the Social Connections section above.
            </div>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {connections?.map((connection) => (
            <AccordionItem key={connection.id} value={connection.id} className="border rounded-lg">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-4">
                  {connection.avatar_url ? (
                    <img
                      src={connection.avatar_url}
                      alt={connection.connection_name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <Youtube className="w-8 h-8" />
                  )}
                  <div className="text-left">
                    <div className="font-semibold">{connection.connection_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {connection.platform_username}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Channel Feed</h4>
                      {channelFeeds[connection.id] && (
                        <p className="text-xs text-muted-foreground">
                          Last updated: {new Date(channelFeeds[connection.id].lastFetched).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {channelFeeds[connection.id] ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => initializeChannelMutation.mutate(connection.id)}
                            disabled={isLoading[connection.id]}
                          >
                            {isLoading[connection.id] ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <RefreshCw className="w-4 h-4 mr-2" />
                            )}
                            Refresh
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => clearChannelFeed(connection.id)}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Clear
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleInitialize(connection.id)}
                          disabled={isLoading[connection.id]}
                        >
                          {isLoading[connection.id] ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Youtube className="w-4 h-4 mr-2" />
                          )}
                          Initialize Feed
                        </Button>
                      )}
                    </div>
                  </div>

                  {channelFeeds[connection.id]?.videos.map((video) => (
                    <Card key={video.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <img
                              src={video.thumbnail_url}
                              alt={video.title}
                              className="w-full rounded-lg"
                            />
                          </div>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {video.description}
                            </p>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>{video.statistics.views} views</span>
                              <span>{video.statistics.likes} likes</span>
                              <span>{video.statistics.comments} comments</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Add to Posts
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Initialize YouTube Feed</AlertDialogTitle>
            <AlertDialogDescription>
              This will fetch the latest videos from your YouTube channel. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmInitialize}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};