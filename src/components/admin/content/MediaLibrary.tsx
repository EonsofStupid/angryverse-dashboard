import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export const MediaLibrary = () => {
  const { toast } = useToast();

  const { data: media, isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching media",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data;
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
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search media..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : media?.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="aspect-square bg-muted rounded-md mb-2">
              {item.type.startsWith('image/') && (
                <img 
                  src={item.url} 
                  alt={item.filename}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
            <p className="text-sm font-medium">{item.filename}</p>
            <p className="text-sm text-muted-foreground">
              Added on {format(new Date(item.created_at), 'MMM d, yyyy')}
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
    </div>
  );
};