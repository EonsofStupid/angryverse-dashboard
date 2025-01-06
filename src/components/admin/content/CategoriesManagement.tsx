import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, ChevronRight, ChevronDown } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "./categories/CategoryForm";
import { Category } from "@/types/database/category";
import { Checkbox } from "@/components/ui/checkbox";

export const CategoriesManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        toast({
          title: "Error fetching categories",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as Category[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting category",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .in('id', ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setSelectedCategories([]);
      toast({
        title: "Categories deleted",
        description: "The selected categories have been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting categories",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleToggleExpand = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && categories) {
      setSelectedCategories(categories.map(cat => cat.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm('Are you sure you want to delete the selected categories?')) {
      bulkDeleteMutation.mutate(selectedCategories);
    }
  };

  const getChildCategories = (parentId: string | null) => {
    return categories?.filter(category => category.parent_id === parentId) || [];
  };

  const renderCategoryRow = (category: Category, level = 0) => {
    const hasChildren = categories?.some(cat => cat.parent_id === category.id);
    const isExpanded = expandedCategories.includes(category.id);

    return (
      <>
        <TableRow key={category.id}>
          <TableCell>
            <Checkbox
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedCategories(prev => [...prev, category.id]);
                } else {
                  setSelectedCategories(prev => prev.filter(id => id !== category.id));
                }
              }}
            />
          </TableCell>
          <TableCell>
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-6 w-6"
                  onClick={() => handleToggleExpand(category.id)}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
              <span className="ml-2">{category.name}</span>
            </div>
          </TableCell>
          <TableCell>{category.slug}</TableCell>
          <TableCell>{category.description || '-'}</TableCell>
          <TableCell className="text-right">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingCategory(category)}
            >
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this category?')) {
                  deleteMutation.mutate(category.id);
                }
              }}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
        {isExpanded && getChildCategories(category.id).map(child => 
          renderCategoryRow(child, level + 1)
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Categories & Tags</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm
              onSubmit={() => setIsCreateDialogOpen(false)}
              onCancel={() => setIsCreateDialogOpen(false)}
              categories={categories || []}
            />
          </DialogContent>
        </Dialog>
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedCategories.length} items selected
          </span>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleBulkDelete}
          >
            Delete Selected
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={categories?.length === selectedCategories.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : getChildCategories(null).map(category => renderCategoryRow(category))}
        </TableBody>
      </Table>

      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              category={editingCategory}
              onSubmit={() => setEditingCategory(null)}
              onCancel={() => setEditingCategory(null)}
              categories={categories || []}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};