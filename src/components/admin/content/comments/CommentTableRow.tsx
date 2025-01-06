import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User, CheckCircle, XCircle, Shield, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Comment } from "@/types/comment";
import { CommentStatusBadge } from "./CommentStatusBadge";

interface CommentTableRowProps {
  comment: Comment;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const CommentTableRow = ({
  comment,
  isSelected,
  onSelect,
  onUpdateStatus,
  onDelete,
}: CommentTableRowProps) => {
  return (
    <TableRow className={comment.parent_id ? "pl-8" : ""}>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(comment.id)}
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
        <CommentStatusBadge status={comment.status} />
      </TableCell>
      <TableCell>
        {comment.parent_id ? 'Reply' : 'Parent'}
      </TableCell>
      <TableCell>{format(new Date(comment.created_at), 'MMM d, yyyy')}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateStatus(
            comment.id,
            comment.status === 'approved' ? 'pending' : 'approved'
          )}
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
          onClick={() => onUpdateStatus(comment.id, 'spam')}
        >
          <Shield className="h-4 w-4 text-yellow-500" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={() => onDelete(comment.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};