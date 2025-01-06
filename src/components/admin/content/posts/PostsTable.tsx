import { format } from "date-fns";
import { Post } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface PostsTableProps {
  posts: Post[];
  isLoading: boolean;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onBulkAction: (action: 'publish' | 'archive' | 'delete', ids: string[]) => void;
}

export const PostsTable = ({ posts, isLoading, onEdit, onDelete, onBulkAction }: PostsTableProps) => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(posts.map(post => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, id]);
    } else {
      setSelectedPosts(selectedPosts.filter(postId => postId !== id));
    }
  };

  return (
    <div className="space-y-4">
      {selectedPosts.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedPosts.length} items selected
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onBulkAction('publish', selectedPosts);
              setSelectedPosts([]);
            }}
          >
            Publish Selected
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onBulkAction('archive', selectedPosts);
              setSelectedPosts([]);
            }}
          >
            Archive Selected
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete the selected posts?')) {
                onBulkAction('delete', selectedPosts);
                setSelectedPosts([]);
              }
            }}
          >
            Delete Selected
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                checked={selectedPosts.length === posts.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300"
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id)}
                  onChange={(e) => handleSelectPost(post.id, e.target.checked)}
                  className="rounded border-gray-300"
                />
              </TableCell>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.profiles?.username || 'Unknown'}</TableCell>
              <TableCell>
                <Badge variant={
                  post.status === 'published' ? 'default' :
                  post.status === 'draft' ? 'secondary' : 'outline'
                }>
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(post.created_at!), 'MMM d, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this post?')) {
                      onDelete(post.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};