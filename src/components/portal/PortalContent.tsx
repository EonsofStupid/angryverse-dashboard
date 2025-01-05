import { DataTable } from "@/components/common/DataTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SocialPostComposer } from "./social/SocialPostComposer";

export const PortalContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data: socialConnections } = useQuery({
    queryKey: ["social-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_connections")
        .select("*")
        .eq("status", "active");

      if (error) throw error;
      return data || [];
    },
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["portal-posts", searchQuery, sortColumn, sortDirection],
    queryFn: async () => {
      let query = supabase
        .from("social_posts")
        .select(`
          id,
          content,
          created_at,
          platform_posts (
            platform,
            status,
            posted_at,
            engagement_metrics
          )
        `);

      if (searchQuery) {
        query = query.ilike("content", `%${searchQuery}%`);
      }

      if (sortColumn) {
        query = query.order(sortColumn, { ascending: sortDirection === "asc" });
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Failed to fetch posts");
        return [];
      }

      return data;
    },
  });

  const columns = [
    { key: "content", label: "Content" },
    { key: "created_at", label: "Created At" },
    { key: "platform_posts", label: "Platforms" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (ids: string[]) => {
    const { error } = await supabase
      .from("social_posts")
      .delete()
      .in("id", ids);

    if (error) {
      toast.error("Failed to delete posts");
    } else {
      toast.success("Posts deleted successfully");
    }
  };

  const handleSocialConnect = (platform: string) => {
    // This will be implemented in the next phase with OAuth integration
    toast.info(`Connecting to ${platform}...`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Social Media Management</h2>
      
      {/* Social Media Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              Facebook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialConnect('Facebook')}
            >
              {socialConnections?.some(c => c.platform === 'facebook')
                ? "Connected"
                : "Connect Facebook"
              }
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-pink-600" />
              Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialConnect('Instagram')}
            >
              {socialConnections?.some(c => c.platform === 'instagram')
                ? "Connected"
                : "Connect Instagram"
              }
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Twitter className="h-5 w-5 text-blue-400" />
              Twitter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialConnect('Twitter')}
            >
              {socialConnections?.some(c => c.platform === 'twitter')
                ? "Connected"
                : "Connect Twitter"
              }
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-700" />
              LinkedIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialConnect('LinkedIn')}
            >
              {socialConnections?.some(c => c.platform === 'linkedin')
                ? "Connected"
                : "Connect LinkedIn"
              }
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-600" />
              YouTube
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialConnect('YouTube')}
            >
              {socialConnections?.some(c => c.platform === 'youtube')
                ? "Connected"
                : "Connect YouTube"
              }
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Post Composer */}
      <div className="mb-8">
        <SocialPostComposer />
      </div>

      {/* Content Management Section */}
      <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
      <DataTable
        columns={columns}
        data={posts || []}
        onSearch={handleSearch}
        onSort={handleSort}
        onDelete={handleDelete}
      />
    </div>
  );
};