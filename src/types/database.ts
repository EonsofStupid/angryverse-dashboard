export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

export interface Post {
  id: string;
  title: string;
  content: string | null;
  author_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface Comment {
  id: string;
  content: string;
  post_id: string | null;
  author_id: string | null;
  status: string;
  created_at: string;
  profiles?: Profile;
}