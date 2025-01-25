import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideTable } from "lucide-react";
import { useTableList } from "@/hooks/useTableList";
import { TableNames } from "@/types/database-management";

interface TableListProps {
  selectedTable: TableNames | null;
  onSelectTable: (table: TableNames) => void;
}

export function TableList({ selectedTable, onSelectTable }: TableListProps) {
  const { data: tables, isLoading } = useTableList();

  return (
    <div className="space-y-4">
      <div className="font-medium flex items-center gap-2">
        <LucideTable className="h-4 w-4" />
        Tables
      </div>
      <ScrollArea className="h-[600px]">
        <div className="space-y-1">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading tables...
            </div>
          ) : (
            tables?.map((table) => (
              <Button
                key={table.name}
                variant={selectedTable === table.name ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectTable(table.name as TableNames)}
              >
                {table.name}
              </Button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}