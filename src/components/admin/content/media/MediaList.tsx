import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Media } from "@/types/database/media";

interface MediaListProps {
  media: Media[];
  onDelete: (id: string) => void;
}

export const MediaList = ({ media, onDelete }: MediaListProps) => {
  return (
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
                alt={item.alt_text || item.filename}
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
            onClick={() => onDelete(item.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};