import { Profile } from "./profile";

export interface Post {
  id: string;
  title: string;
  content: string | null;
  author_id: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
  profiles?: Profile | null;
}