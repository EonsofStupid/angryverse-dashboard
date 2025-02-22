import { Profile } from "./profile";

export interface Post {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  author_id: string | null;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  view_count?: number;
  profiles?: Profile | null;
}