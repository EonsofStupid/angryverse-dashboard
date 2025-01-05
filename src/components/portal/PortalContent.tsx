import { SocialConnections } from "./social/SocialConnections";
import { SocialPostComposer } from "./social/SocialPostComposer";
import { DataTable } from "@/components/common/DataTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const PortalContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Social Media Management</h2>
      
      {/* Social Media Connections */}
      <SocialConnections />

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