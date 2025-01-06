import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post, Category, Media } from "@/types/database";
import { MediaSelector } from "./MediaSelector";
import { Editor } from "@/components/editor/Editor";
import { toast } from "sonner";

interface EnhancedPostFormProps {
  post?: Post;
  onSubmit: (data: Partial<Post>) => void;
  onCancel: () => void;
}

export const EnhancedPostForm = ({ post, onSubmit, onCancel }: EnhancedPostFormProps) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(post?.featured_image ?? null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  const { data: postCategories } = useQuery({
    queryKey: ['post-categories', post?.id],
    queryFn: async () => {
      if (!post?.id) return [];
      
      const { data, error } = await supabase
        .from('posts_categories')
        .select('category_id')
        .eq('post_id', post.id);
      
      if (error) throw error;
      return data.map(pc => pc.category_id);
    },
    enabled: !!post?.id,
  });

  useEffect(() => {
    if (postCategories) {
      setSelectedCategories(postCategories);
    }
  }, [postCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    const postData: Partial<Post> = {
      title,
      content,
      excerpt,
      status,
      meta_title: metaTitle,
      meta_description: metaDescription,
      featured_image: featuredImage,
      ...(post?.id ? { id: post.id } : {}),
    };

    onSubmit(postData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Editor 
              initialContent={content}
              onChange={setContent}
              placeholder="Start writing your post..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter post excerpt"
              className="h-20"
            />
          </div>
        </div>

        <div className="w-80 space-y-6">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category.id]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((id) => id !== category.id)
                          );
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              <MediaSelector
                value={featuredImage}
                onChange={setFeaturedImage}
                accept="image/*"
              />
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <Tabs defaultValue="seo">
              <TabsList className="w-full">
                <TabsTrigger value="seo" className="flex-1">SEO</TabsTrigger>
                <TabsTrigger value="social" className="flex-1">Social</TabsTrigger>
              </TabsList>
              
              <TabsContent value="seo" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="SEO description"
                    className="h-20"
                  />
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                {/* Social sharing preview will be implemented later */}
                <p className="text-sm text-muted-foreground">
                  Social sharing preview coming soon
                </p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
};