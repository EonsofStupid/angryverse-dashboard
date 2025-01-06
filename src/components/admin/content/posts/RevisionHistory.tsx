import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";

interface RevisionHistoryProps {
  postId: string;
  onRestoreRevision: (revision: any) => void;
}

export const RevisionHistory = ({ postId, onRestoreRevision }: RevisionHistoryProps) => {
  const { data: revisions, isLoading } = useQuery({
    queryKey: ['post-revisions', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_revisions')
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!postId,
  });

  if (isLoading) {
    return <div>Loading revision history...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <History className="w-4 h-4" />
        <h3 className="text-sm font-medium">Revision History</h3>
      </div>
      
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {revisions?.map((revision) => (
            <div
              key={revision.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {revision.profiles?.username || 'Unknown user'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(revision.created_at), 'MMM d, yyyy HH:mm')}
                </p>
                {revision.revision_note && (
                  <p className="text-xs italic">{revision.revision_note}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRestoreRevision(revision)}
              >
                Restore
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};