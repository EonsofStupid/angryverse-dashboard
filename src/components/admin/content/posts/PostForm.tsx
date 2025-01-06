import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Post } from "@/types/post";

interface PostFormProps {
  post?: Post;
  onSubmit: (data: Partial<Post>) => void;
}

export const PostForm = ({ post, onSubmit }: PostFormProps) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(post?.status ?? "draft");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, status, ...(post?.id ? { id: post.id } : {}) });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as 'draft' | 'published' | 'archived');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">Content</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter post content"
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">Status</label>
        <Select value={status} onValueChange={handleStatusChange}>
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

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
};