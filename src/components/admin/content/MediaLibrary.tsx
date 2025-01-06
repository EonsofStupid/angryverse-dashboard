import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { Upload, Search, LayoutGrid, List, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Media } from "@/types/database/media";

export const MediaLibrary = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploading, setIsUploading] = useState(false);

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

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // Insert into media table
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          filename: file.name,
          url: publicUrl,
          type: file.type,
          size: file.size,
        });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    try {
      await Promise.all(acceptedFiles.map(file => uploadMutation.mutateAsync(file)));
    } finally {
      setIsUploading(false);
    }
  }, [uploadMutation]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search media..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 border rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted",
          "cursor-pointer"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the files here..."
              : "Drag 'n' drop files here, or click to select files"}
          </p>
        </div>
      </div>

      {isUploading && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Uploading files...</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media?.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
                {item.type.startsWith('image/') && (
                  <img 
                    src={item.url} 
                    alt={item.filename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <p className="text-sm font-medium truncate">{item.filename}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(item.created_at || ''), 'MMM d, yyyy')}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-destructive w-full"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {media?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-card rounded-lg"
            >
              <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                {item.type.startsWith('image/') && (
                  <img 
                    src={item.url} 
                    alt={item.filename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium">{item.filename}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(item.created_at || ''), 'MMM d, yyyy')}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};