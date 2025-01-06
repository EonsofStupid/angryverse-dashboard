import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types/comment";
import { SearchBar } from "@/components/common/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Shield, CheckCircle, Filter } from "lucide-react";
import { CommentActions } from "./comments/CommentActions";
import { CommentsTable } from "./comments/CommentsTable";
import { DeleteCommentsDialog } from "./comments/DeleteCommentsDialog";

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
        <CommentActions
          selectedComments={selectedComments}
          onApprove={(ids) => {
            ids.forEach(id => updateCommentStatus.mutate({ id, status: 'approved' }));
            setSelectedComments([]);
          }}
          onMarkSpam={(ids) => {
            ids.forEach(id => updateCommentStatus.mutate({ id, status: 'spam' }));
            setSelectedComments([]);
          }}
          onDelete={() => setShowDeleteDialog(true)}
        />
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
          <CommentsTable
            comments={comments || []}
            selectedComments={selectedComments}
            onSelectAll={handleSelectAll}
            onSelectComment={handleSelectComment}
            onUpdateStatus={(id, status) => updateCommentStatus.mutate({ id, status })}
            onDelete={(id) => {
              setSelectedComments([id]);
              setShowDeleteDialog(true);
            }}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>

      <DeleteCommentsDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => deleteComments.mutate(selectedComments)}
      />
    </div>
  );
};