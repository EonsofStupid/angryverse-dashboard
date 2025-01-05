export interface VideoMetrics {
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
  name: string;
  platformUsername: string;
  avatarUrl?: string;
  status: 'active' | 'inactive';
}

export interface PlatformConfig {
  id: string;
  platform: string;
  displayName: string;
  icon: string;
  color: string;
  supportsVideo: boolean;
}