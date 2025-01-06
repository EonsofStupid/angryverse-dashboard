import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@/types/user";

interface UserFilterProps {
  selectedStatus: UserStatus | 'all';
  onStatusChange: (status: UserStatus | 'all') => void;
}

export const UserFilter = ({ selectedStatus, onStatusChange }: UserFilterProps) => {
  return (
    <div className="flex justify-end mb-4">
      <Select
        value={selectedStatus}
        onValueChange={(value) => onStatusChange(value as UserStatus | 'all')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
          <SelectItem value="banned">Banned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};