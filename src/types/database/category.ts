export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
}