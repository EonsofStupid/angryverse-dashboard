import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  MessageSquare, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Trash2,
  Filter,
  User
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types/comment";
import { SearchBar } from "@/components/common/SearchBar";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

export const CommentsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState<'all' | 'pending' | 'approved' | 'spam'>('all');

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', currentTab, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('comments')
        .select(`
          id,
          content,
          post_id,
          author_id,
          status,
          created_at,
          parent_id,
          profiles!comments_author_id_fkey (
            id,
            username,
            avatar_url,
            updated_at
          )
        `)
        .order('created_at', { ascending: false });

      if (currentTab !== 'all') {
        query = query.eq('status', currentTab);
      }

      if (searchQuery) {
        query = query.ilike('content', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error fetching comments",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as unknown as Comment[];
    },
  });

  const updateCommentStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('comments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast({
        title: "Comment status updated",
        description: "The comment status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating comment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteComments = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .in('id', ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setSelectedComments([]);
      toast({
        title: "Comments deleted",
        description: "The selected comments have been deleted successfully.",
      });
      setShowDeleteDialog(false);
    },
    onError: (error) => {
      toast({
        title: "Error deleting comments",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedComments(comments?.map(comment => comment.id) || []);
    } else {
      setSelectedComments([]);
    }
  };

  const handleSelectComment = (id: string) => {
    setSelectedComments(prev => 
      prev.includes(id) 
        ? prev.filter(commentId => commentId !== id)
        : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="w-64">
          <SearchBar onSearch={handleSearch} placeholder="Search comments..." />
        </div>
        {selectedComments.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                selectedComments.forEach(id => 
                  updateCommentStatus.mutate({ id, status: 'approved' })
                );
                setSelectedComments([]);
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                selectedComments.forEach(id => 
                  updateCommentStatus.mutate({ id, status: 'spam' })
                );
                setSelectedComments([]);
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              Mark as Spam
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as typeof currentTab)}>
        <TabsList>
          <TabsTrigger value="all">
            <MessageSquare className="h-4 w-4 mr-2" />
            All Comments
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Filter className="h-4 w-4 mr-2" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="spam">
            <Shield className="h-4 w-4 mr-2" />
            Spam
          </TabsTrigger>
        </TabsList>

        <TabsContent value={currentTab}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedComments.length === comments?.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Thread</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : comments?.map((comment) => (
                <TableRow key={comment.id} className={comment.parent_id ? "pl-8" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={selectedComments.includes(comment.id)}
                      onCheckedChange={() => handleSelectComment(comment.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-md truncate">
                    {comment.content}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {comment.profiles?.username || 'Anonymous'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${comment.status === 'approved' ? 'bg-green-100 text-green-800' :
                        comment.status === 'spam' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {comment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {comment.parent_id ? 'Reply' : 'Parent'}
                  </TableCell>
                  <TableCell>{format(new Date(comment.created_at), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateCommentStatus.mutate({ 
                        id: comment.id, 
                        status: comment.status === 'approved' ? 'pending' : 'approved' 
                      })}
                    >
                      {comment.status === 'approved' ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateCommentStatus.mutate({ 
                        id: comment.id, 
                        status: 'spam'
                      })}
                    >
                      <Shield className="h-4 w-4 text-yellow-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => {
                        setSelectedComments([comment.id]);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected comments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteComments.mutate(selectedComments)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};