import { format } from "date-fns";
import { Post } from "@/types/post";
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

interface PostsTableProps {
  posts: Post[];
  isLoading: boolean;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export const PostsTable = ({ posts, isLoading, onEdit, onDelete }: PostsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
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
            <TableCell colSpan={5} className="text-center">Loading...</TableCell>
          </TableRow>
        ) : posts?.map((post) => (
          <TableRow key={post.id}>
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
            <TableCell>{format(new Date(post.created_at), 'MMM d, yyyy')}</TableCell>
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
  );
};