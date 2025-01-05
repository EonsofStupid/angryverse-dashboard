import { Profile } from "./profile";

export interface Comment {
  id: string;
  content: string;
  post_id: string | null;
  author_id: string | null;
  status: string;
  created_at: string;
  profiles?: Profile;
}