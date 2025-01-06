import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Video } from "lucide-react";
import { SocialConnection } from "@/types/social";
import { useState } from "react";
import { ConnectionWizard } from "./ConnectionWizard";
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

export const SocialConnections = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [connectionToDelete, setConnectionToDelete] = useState<SocialConnection | null>(null);
  const queryClient = useQueryClient();

  const { data: connections } = useQuery({
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

  const handleDisconnect = async (connection: SocialConnection) => {
    setConnectionToDelete(connection);
  };

  const confirmDelete = async () => {
    if (!connectionToDelete) return;

    try {
      // First, delete any associated platform posts
      const { error: platformPostsError } = await supabase
        .from("platform_posts")
        .delete()
        .eq("platform", connectionToDelete.platform);

      if (platformPostsError) {
        throw platformPostsError;
      }

      // Then, update the connection status to inactive
      const { error: connectionError } = await supabase
        .from("social_connections")
        .update({ status: "inactive" })
        .eq("id", connectionToDelete.id);

      if (connectionError) {
        throw connectionError;
      }

      toast.success("Account disconnected successfully");
      queryClient.invalidateQueries({ queryKey: ["social-connections"] });
    } catch (error) {
      console.error("Error disconnecting account:", error);
      toast.error("Failed to disconnect account");
    } finally {
      setConnectionToDelete(null);
    }
  };

  const platformConfigs = [
    {
      platform: "facebook",
      icon: Facebook,
      color: "text-blue-600",
      title: "Facebook",
    },
    {
      platform: "facebook_video",
      icon: Video,
      color: "text-blue-600",
      title: "Facebook Video",
    },
    {
      platform: "instagram",
      icon: Instagram,
      color: "text-pink-600",
      title: "Instagram",
    },
    {
      platform: "twitter",
      icon: Twitter,
      color: "text-blue-400",
      title: "Twitter/X",
    },
    {
      platform: "linkedin",
      icon: Linkedin,
      color: "text-blue-700",
      title: "LinkedIn",
    },
    {
      platform: "youtube",
      icon: Youtube,
      color: "text-red-600",
      title: "YouTube",
    },
    {
      platform: "twitch",
      icon: Video,
      color: "text-purple-600",
      title: "Twitch",
    },
    {
      platform: "rumble",
      icon: Video,
      color: "text-orange-600",
      title: "Rumble",
    },
    {
      platform: "tiktok",
      icon: Video,
      color: "text-pink-600",
      title: "TikTok",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {platformConfigs.map(({ platform, icon: Icon, color, title }) => {
          const platformConnections = connections?.filter(
            (c) => c.platform === platform
          );

          return (
            <Card key={platform}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${color}`} />
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {platformConnections?.length ? (
                  <div className="space-y-4">
                    {platformConnections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex items-center justify-between p-2 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {connection.avatar_url && (
                            <img
                              src={connection.avatar_url}
                              alt={connection.connection_name || ""}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <p className="font-medium">
                              {connection.connection_name || connection.platform_username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {connection.account_type}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDisconnect(connection)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      Connect Another {title} Account
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    Connect {title}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ConnectionWizard
        platform={selectedPlatform || ""}
        isOpen={!!selectedPlatform}
        onClose={() => setSelectedPlatform(null)}
      />

      <AlertDialog open={!!connectionToDelete} onOpenChange={() => setConnectionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disconnect this account? This will remove all associated posts and data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};