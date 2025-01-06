import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Media } from "@/types/database";
import { Image, X } from "lucide-react";

interface MediaSelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
  accept?: string;
}

export const MediaSelector = ({ value, onChange, accept }: MediaSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: media } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Media[];
    },
  });

  const { data: selectedMedia } = useQuery({
    queryKey: ['media', value],
    queryFn: async () => {
      if (!value) return null;
      
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('id', value)
        .single();
      
      if (error) throw error;
      return data as Media;
    },
    enabled: !!value,
  });

  return (
    <div className="space-y-2">
      {selectedMedia ? (
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src={selectedMedia.url}
            alt={selectedMedia.alt_text || selectedMedia.filename}
            className="w-full h-full object-cover"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => onChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <Image className="h-8 w-8 text-muted-foreground" />
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="w-full">
            {value ? "Change Image" : "Select Image"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            {media?.filter(item => !accept || item.type.startsWith(accept.replace('/*', '/')))
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onChange(item.id);
                    setIsOpen(false);
                  }}
                  className="relative aspect-square bg-muted rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all"
                >
                  <img
                    src={item.url}
                    alt={item.alt_text || item.filename}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};