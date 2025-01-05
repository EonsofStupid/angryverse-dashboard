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
        .from("posts")
        .select(`
          id,
          title,
          content,
          status,
          created_at,
          profiles (username)
        `);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Content</h2>
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