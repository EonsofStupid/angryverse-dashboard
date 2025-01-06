import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload, Search } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import { useToast } from "@/hooks/use-toast";
import { Media } from "@/types/database/media";

export const MediaManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ['media', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('media')
        .select('*');

      if (searchQuery) {
        query = query.ilike('filename', `%${searchQuery}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching media",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as Media[];
    },
  });

  const columns = [
    { key: "filename", label: "File Name" },
    { key: "type", label: "Type" },
    { key: "size", label: "Size" },
    { key: "created_at", label: "Upload Date" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDelete = async (ids: string[]) => {
    const { error } = await supabase
      .from('media')
      .delete()
      .in('id', ids);

    if (error) {
      toast({
        title: "Error deleting media",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Media deleted",
        description: "Selected media files have been deleted successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Media Library</h2>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={mediaItems || []}
        onSearch={handleSearch}
        onDelete={handleDelete}
      />
    </div>
  );
};