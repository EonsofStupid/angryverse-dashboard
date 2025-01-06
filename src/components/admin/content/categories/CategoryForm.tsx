import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/database/category";

interface CategoryFormProps {
  category?: Category;
  onSubmit: () => void;
  onCancel: () => void;
  categories: Category[];
}

export const CategoryForm = ({ category, onSubmit, onCancel, categories }: CategoryFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [name, setName] = useState(category?.name || "");
  const [slug, setSlug] = useState(category?.slug || "");
  const [description, setDescription] = useState(category?.description || "");
  const [parentId, setParentId] = useState(category?.parent_id || "");
  const [metaTitle, setMetaTitle] = useState(category?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(category?.meta_description || "");

  const mutation = useMutation({
    mutationFn: async (data: { 
      name: string; 
      slug: string; 
      description?: string; 
      parent_id?: string | null;
      meta_title?: string;
      meta_description?: string;
    }) => {
      if (category?.id) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: category ? "Category updated" : "Category created",
        description: `The category has been ${category ? 'updated' : 'created'} successfully.`,
      });
      onSubmit();
    },
    onError: (error) => {
      toast({
        title: `Error ${category ? 'updating' : 'creating'} category`,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !slug) {
      toast({
        title: "Validation Error",
        description: "Name and slug are required fields.",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate({
      name,
      slug,
      description,
      parent_id: parentId || null,
      meta_title: metaTitle,
      meta_description: metaDescription,
    });
  };

  const availableParentCategories = categories.filter(cat => 
    cat.id !== category?.id && !isDescendant(cat, category?.id)
  );

  function isDescendant(cat: Category, targetId: string | undefined): boolean {
    if (!targetId) return false;
    if (cat.parent_id === targetId) return true;
    const parent = categories.find(c => c.id === cat.parent_id);
    return parent ? isDescendant(parent, targetId) : false;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!category) {
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
            }
          }}
          placeholder="Category name"
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="category-slug"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Category description"
        />
      </div>

      <div>
        <Label htmlFor="parent">Parent Category</Label>
        <Select value={parentId} onValueChange={setParentId}>
          <SelectTrigger>
            <SelectValue placeholder="Select parent category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {availableParentCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="SEO meta title"
        />
      </div>

      <div>
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="SEO meta description"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {category ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  );
};