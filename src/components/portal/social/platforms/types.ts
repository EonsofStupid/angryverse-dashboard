export interface VideoMetrics {
  [key: string]: number | undefined;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  metrics: VideoMetrics;
  platformId: string;
  url: string;
}

export interface PlatformConnection {
  id: string;
  user_id: string;
  platform: string;
  platform_user_id: string | null;
  platform_username: string | null;
  access_token: string | null;
  refresh_token: string | null;
  token_expires_at: string | null;
  connected_at: string | null;
  status: 'active' | 'inactive';
  connection_name: string | null;
  account_type: string | null;
  profile_url: string | null;
  avatar_url: string | null;
  name?: string;
}

export interface PlatformConfig {
  id: string;
  platform: string;
  displayName: string;
  icon: string;
  color: string;
  supportsVideo: boolean;
}