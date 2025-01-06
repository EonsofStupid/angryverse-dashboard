import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EnhancedPostForm } from "./EnhancedPostForm";
import { PostsTable } from "./PostsTable";
import { usePostsQuery } from "./usePostsQuery";

export const PostsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { data: posts, isLoading } = usePostsQuery(searchQuery, statusFilter);

  const createPostMutation = useMutation({
    mutationFn: async (newPost: Partial<Post>) => {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          title: newPost.title,
          content: newPost.content,
          excerpt: newPost.excerpt,
          status: newPost.status,
          meta_title: newPost.meta_title,
          meta_description: newPost.meta_description,
          featured_image: newPost.featured_image,
          author_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post created",
        description: "The post has been created successfully.",
      });
      setIsCreateDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async (post: Partial<Post>) => {
      const { data, error } = await supabase
        .from('posts')
        .update({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          status: post.status,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          featured_image: post.featured_image,
          updated_at: new Date().toISOString(),
        })
        .eq('id', post.id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post updated",
        description: "The post has been updated successfully.",
      });
      setSelectedPost(null);
    },
    onError: (error) => {
      toast({
        title: "Error updating post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBulkAction = async (action: 'publish' | 'archive' | 'delete', ids: string[]) => {
    if (action === 'delete') {
      ids.forEach(id => deletePostMutation.mutate(id));
    } else {
      ids.forEach(id => {
        updatePostMutation.mutate({
          id,
          status: action === 'publish' ? 'published' : 'archived'
        });
      });
    }
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={statusFilter || undefined} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <EnhancedPostForm
              onSubmit={(data) => createPostMutation.mutate(data)}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={selectedPost !== null} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <EnhancedPostForm
              post={selectedPost}
              onSubmit={(data) => updatePostMutation.mutate(data)}
              onCancel={() => setSelectedPost(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <PostsTable
        posts={posts || []}
        isLoading={isLoading}
        onEdit={handleEditPost}
        onDelete={(id) => deletePostMutation.mutate(id)}
        onBulkAction={handleBulkAction}
      />
    </div>
  );
};