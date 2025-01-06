import { useState } from "react";
import { Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TableList } from "./TableList";
import { DataTable } from "./DataTable";
import { TableNames } from "@/types/database-management";

export const DatabaseManagement = () => {
  const [selectedTable, setSelectedTable] = useState<TableNames | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="col-span-1">
          <TableList
            selectedTable={selectedTable}
            onSelectTable={setSelectedTable}
          />
        </div>

        <div className="col-span-3">
          <DataTable
            selectedTable={selectedTable}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};