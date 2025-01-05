import { DataTable } from "@/components/common/DataTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const PortalContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["portal-posts", searchQuery, sortColumn, sortDirection],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select("id, title, content, status, created_at, profiles!inner(username)");

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
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
    { key: "title", label: "Title" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Created At" },
    { key: "profiles.username", label: "Author" },
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
      .from("posts")
      .delete()
      .in("id", ids);

    if (error) {
      toast.error("Failed to delete posts");
    } else {
      toast.success("Posts deleted successfully");
    }
  };

  const handleSocialConnect = (platform: string) => {
    toast.info(`Connecting to ${platform}...`);
    // Here you would implement the actual social media connection logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Portal</h2>
      
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
              Connect Facebook
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
              Connect Instagram
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
              Connect Twitter
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
              Connect LinkedIn
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
              Connect YouTube
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Section */}
      <h3 className="text-xl font-semibold mb-4">Your Content</h3>
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