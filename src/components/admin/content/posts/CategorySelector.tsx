import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@/types/database/category";

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoryChange: (categoryIds: string[]) => void;
}

export const CategorySelector = ({
  selectedCategories,
  onCategoryChange,
}: CategorySelectorProps) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="space-y-2">
      {categories?.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                onCategoryChange([...selectedCategories, category.id]);
              } else {
                onCategoryChange(
                  selectedCategories.filter((id) => id !== category.id)
                );
              }
            }}
          />
          <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
        </div>
      ))}
    </div>
  );
};