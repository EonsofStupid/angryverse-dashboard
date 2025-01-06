import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Table as LucideTable, Search, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DatabaseManagement = () => {
  const { toast } = useToast();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState<{ [key: string]: any } | null>(null);

  const { data: tables, isLoading: loadingTables } = useQuery({
    queryKey: ['database-tables'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('_tables')
        .select('*');

      if (error) {
        toast({
          title: "Error fetching tables",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  const { data: tableData, isLoading: loadingData } = useQuery({
    queryKey: ['table-data', selectedTable, searchQuery],
    enabled: !!selectedTable,
    queryFn: async () => {
      let query = supabase
        .from(selectedTable!)
        .select('*');

      if (searchQuery) {
        // Basic search across all text columns
        query = query.or(`id.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  const handleSaveRow = async (row: any) => {
    const { error } = await supabase
      .from(selectedTable!)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Database Management</h2>
        <div className="flex items-center gap-4">
          <Database className="h-6 w-6 text-muted-foreground" />
          {selectedTable && (
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="font-medium flex items-center gap-2">
            <LucideTable className="h-4 w-4" />
            Tables
          </div>
          <ScrollArea className="h-[600px]">
            <div className="space-y-1">
              {loadingTables ? (
                <div className="p-4 text-center text-muted-foreground">
                  Loading tables...
                </div>
              ) : (
                tables?.map((table: any) => (
                  <Button
                    key={table.name}
                    variant={selectedTable === table.name ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedTable(table.name)}
                  >
                    {table.name}
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="col-span-3">
          {selectedTable ? (
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
                  {loadingData ? (
                    <TableRow>
                      <TableCell colSpan={100} className="text-center">
                        Loading data...
                      </TableCell>
                    </TableRow>
                  ) : (
                    tableData?.map((row: any) => (
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
                        {Object.entries(row).map(([key, value]: [string, any]) => (
                          <TableCell key={key}>
                            {editingRow?.id === row.id ? (
                              <Input
                                value={editingRow[key] || ""}
                                onChange={(e) =>
                                  setEditingRow({
                                    ...editingRow,
                                    [key]: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              String(value)
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="h-[600px] border rounded-lg flex items-center justify-center text-muted-foreground">
              Select a table to view and manage its data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};