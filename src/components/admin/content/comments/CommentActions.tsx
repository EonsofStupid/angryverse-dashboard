import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Trash2 } from "lucide-react";
import { Comment } from "@/types/comment";

interface CommentActionsProps {
  selectedComments: string[];
  onApprove: (ids: string[]) => void;
  onMarkSpam: (ids: string[]) => void;
  onDelete: () => void;
}

export const CommentActions = ({
  selectedComments,
  onApprove,
  onMarkSpam,
  onDelete,
}: CommentActionsProps) => {
  if (selectedComments.length === 0) return null;

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApprove(selectedComments)}
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Approve Selected
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onMarkSpam(selectedComments)}
      >
        <Shield className="h-4 w-4 mr-2" />
        Mark as Spam
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete Selected
      </Button>
    </div>
  );
};