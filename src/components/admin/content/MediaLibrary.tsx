import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MediaLibrary = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search media..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="p-4">
            <div className="aspect-square bg-muted rounded-md mb-2" />
            <p className="text-sm font-medium">image-{item}.jpg</p>
            <p className="text-sm text-muted-foreground">Added on Jan 5, 2024</p>
          </Card>
        ))}
      </div>
    </div>
  );
};