import { Profile } from "./profile";

export interface Post {
  id: string;
  title: string;
  content: string | null;
  author_id: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  profiles: Profile | null;
}