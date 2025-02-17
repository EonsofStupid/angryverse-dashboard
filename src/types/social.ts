export interface SocialConnection {
  id: string;
  user_id: string;
  platform: string;
  platform_user_id: string | null;
  platform_username: string | null;
  access_token: string | null;
  refresh_token: string | null;
  token_expires_at: string | null;
  connected_at: string | null;
  status: string;
  connection_name: string | null;
  account_type: string | null;
  profile_url: string | null;
  avatar_url: string | null;
  last_sync_at: string | null;
  error_logs: Array<{ message: string; timestamp?: string }> | null;
  performance_metrics: Record<string, any> | null;
  extended_config: Record<string, any> | null;
}

export interface PlatformPost {
  id: string;
  social_post_id: string;
  platform: string;
  platform_post_id: string | null;
  status: string;
  posted_at: string | null;
  engagement_metrics: Record<string, any> | null;
}

export interface SocialPost {
  id: string;
  content: string;
  user_id: string;
  media_urls: string[] | null;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
  platform_posts?: PlatformPost[];
}

// Add these types from social_portal/social/platforms/types.ts
export interface VideoMetrics {
  [key: string]: number | undefined;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  followers?: number;
  subscribers?: number;
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

export interface PlatformConfig {
  id: string;
  platform: string;
  displayName: string;
  icon: string;
  color: string;
  supportsVideo: boolean;
}

// Add from wizard/types.ts
export interface WizardConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  connectionLabel: string;
}