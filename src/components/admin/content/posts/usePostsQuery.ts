import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/post";
import { useToast } from "@/hooks/use-toast";

export const usePostsQuery = (searchQuery: string, statusFilter: string | null) => {
  const { toast } = useToast();

  return useQuery<Post[]>({
    queryKey: ['posts', searchQuery, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles (
            id,
            username,
            avatar_url,
            updated_at
          )
        `);

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching posts",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      // Transform the data to ensure it matches the Post type interface
      return data.map(post => ({
        ...post,
        profiles: post.profiles || null
      })) as Post[];
    },
  });
};