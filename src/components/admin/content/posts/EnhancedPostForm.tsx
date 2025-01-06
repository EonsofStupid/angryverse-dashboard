import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/types/post";
import { Editor } from "@/components/editor/Editor";
import { MediaSelector } from "./MediaSelector";
import { SeoMetadataForm } from "./forms/SeoMetadataForm";
import { CategorySelector } from "./forms/CategorySelector";
import { StatusSelector } from "./forms/StatusSelector";
import { RevisionHistory } from "./RevisionHistory";
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
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(post?.status ?? "draft");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(post?.featured_image ?? null);

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
              <StatusSelector status={status} onStatusChange={(value) => setStatus(value as 'draft' | 'published' | 'archived')} />
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <CategorySelector
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
              />
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
              
              <TabsContent value="seo">
                <SeoMetadataForm
                  metaTitle={metaTitle}
                  metaDescription={metaDescription}
                  onMetaTitleChange={setMetaTitle}
                  onMetaDescriptionChange={setMetaDescription}
                />
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Social sharing preview coming soon
                </p>
              </TabsContent>
            </Tabs>
          </Card>

          {post?.id && (
            <Card className="p-4">
              <RevisionHistory
                postId={post.id}
                onRestoreRevision={(revision) => {
                  setTitle(revision.title);
                  setContent(revision.content);
                  toast.success("Revision restored");
                }}
              />
            </Card>
          )}
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