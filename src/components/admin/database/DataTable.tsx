import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Save, X } from "lucide-react";
import { useTableData } from "@/hooks/useTableData";
import { TableNames, TableRowData } from "@/types/database-management";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface DataTableProps {
  selectedTable: TableNames | null;
  searchQuery: string;
}

export function DataTable({ selectedTable, searchQuery }: DataTableProps) {
  const { toast } = useToast();
  const { data: tableData, isLoading } = useTableData(selectedTable, searchQuery);
  const [editingRow, setEditingRow] = useState<TableRowData | null>(null);

  const handleSaveRow = async (row: TableRowData) => {
    if (!selectedTable) return;

    const { error } = await supabase
      .from(selectedTable)
      .update(row)
      .eq('id', row.id);

    if (error) {
      toast({
        title: "Error saving changes",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Changes saved",
        description: "Row updated successfully",
      });
      setEditingRow(null);
    }
  };

  if (!selectedTable) {
    return (
      <div className="h-[600px] border rounded-lg flex items-center justify-center text-muted-foreground">
        Select a table to view and manage its data
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Actions</TableHead>
            {tableData?.[0] && 
              Object.keys(tableData[0]).map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={100} className="text-center">
                Loading data...
              </TableCell>
            </TableRow>
          ) : (
            tableData?.map((row: TableRowData) => (
              <TableRow key={row.id}>
                <TableCell>
                  {editingRow?.id === row.id ? (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSaveRow(editingRow)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingRow(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingRow(row)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
                {Object.entries(row).map(([key, value]) => (
                  <TableCell key={key}>
                    {editingRow?.id === row.id ? (
                      <Input
                        value={String(value ?? '')}
                        onChange={(e) =>
                          setEditingRow({
                            ...editingRow,
                            [key]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}