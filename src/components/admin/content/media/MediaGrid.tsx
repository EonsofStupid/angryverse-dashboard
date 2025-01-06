import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Media } from "@/types/database/media";

interface MediaGridProps {
  media: Media[];
  onDelete: (id: string) => void;
}

export const MediaGrid = ({ media, onDelete }: MediaGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media?.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
            {item.type.startsWith('image/') && (
              <img 
                src={item.url} 
                alt={item.alt_text || item.filename}
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
            onClick={() => onDelete(item.id)}
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
};