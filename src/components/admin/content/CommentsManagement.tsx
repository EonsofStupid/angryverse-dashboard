import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export const CommentsManagement = () => {
  const { toast } = useToast();

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:author_id (username),
          posts:post_id (title)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching comments",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('comments')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error updating comment",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Comment updated",
        description: `The comment has been ${status}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search comments..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : comments?.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell className="font-medium">
                {comment.profiles?.username || 'Unknown'}
              </TableCell>
              <TableCell>{comment.content}</TableCell>
              <TableCell>{comment.posts?.title || 'Deleted post'}</TableCell>
              <TableCell>{format(new Date(comment.created_at), 'MMM d, yyyy')}</TableCell>
              <TableCell className="capitalize">{comment.status}</TableCell>
              <TableCell className="text-right">
                {comment.status === 'pending' && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleStatusUpdate(comment.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleStatusUpdate(comment.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};