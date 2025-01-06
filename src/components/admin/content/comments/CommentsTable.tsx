import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Comment } from "@/types/comment";
import { CommentTableRow } from "./CommentTableRow";

interface CommentsTableProps {
  comments: Comment[];
  selectedComments: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectComment: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const CommentsTable = ({
  comments,
  selectedComments,
  onSelectAll,
  onSelectComment,
  onUpdateStatus,
  onDelete,
  isLoading,
}: CommentsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={selectedComments.length === comments?.length}
              onCheckedChange={onSelectAll}
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
          <CommentTableRow
            key={comment.id}
            comment={comment}
            isSelected={selectedComments.includes(comment.id)}
            onSelect={onSelectComment}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};