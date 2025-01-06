import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { MediaUploader } from "./media/MediaUploader";
import { MediaToolbar } from "./media/MediaToolbar";
import { MediaGrid } from "./media/MediaGrid";
import { MediaList } from "./media/MediaList";
import { Media } from "@/types/database/media";

export const MediaLibrary = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: media, isLoading } = useQuery({
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

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting media",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Media deleted",
        description: "The media has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['media'] });
    }
  };

  return (
    <div className="space-y-6">
      <MediaToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <MediaUploader />

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : viewMode === "grid" ? (
        <MediaGrid media={media || []} onDelete={handleDelete} />
      ) : (
        <MediaList media={media || []} onDelete={handleDelete} />
      )}
    </div>
  );
};