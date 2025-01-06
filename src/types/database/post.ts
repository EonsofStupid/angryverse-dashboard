import { Profile } from "./profile";
import { Media } from "./media";
import { Category } from "./category";

export interface Post {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  author_id: string | null;
  status: 'draft' | 'published' | 'archived';
  created_at: string | null;
  updated_at: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  view_count?: number;
  profiles?: Profile;
  media?: Media;
  categories?: Category[];
}

export interface PostRevision {
  id: string;
  post_id: string;
  title: string;
  content: string | null;
  author_id: string | null;
  created_at: string;
  revision_note?: string;
}