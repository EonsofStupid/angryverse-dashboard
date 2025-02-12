import { PlatformConfig } from "@/types/social";

export const platformConfigs: PlatformConfig[] = [
  {
    id: "youtube",
    platform: "youtube",
    displayName: "YouTube",
    icon: "Youtube",
    color: "text-red-600",
    supportsVideo: true
  },
  {
    id: "facebook",
    platform: "facebook",
    displayName: "Facebook",
    icon: "Facebook",
    color: "text-blue-600",
    supportsVideo: false
  },
  {
    id: "facebook_video",
    platform: "facebook_video",
    displayName: "Facebook Video",
    icon: "Video",
    color: "text-blue-600",
    supportsVideo: true
  },
  {
    id: "twitch",
    platform: "twitch",
    displayName: "Twitch",
    icon: "Twitch",
    color: "text-purple-600",
    supportsVideo: true
  },
  {
    id: "rumble",
    platform: "rumble",
    displayName: "Rumble",
    icon: "Video",
    color: "text-orange-600",
    supportsVideo: true
  },
  {
    id: "tiktok",
    platform: "tiktok",
    displayName: "TikTok",
    icon: "Video",
    color: "text-pink-600",
    supportsVideo: true
  },
  {
    id: "instagram",
    platform: "instagram",
    displayName: "Instagram",
    icon: "Instagram",
    color: "text-pink-500",
    supportsVideo: false
  },
  {
    id: "linkedin",
    platform: "linkedin",
    displayName: "LinkedIn",
    icon: "Linkedin",
    color: "text-blue-500",
    supportsVideo: false
  }
];