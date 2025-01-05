import { Facebook, Video, Youtube, MessageCircle } from "lucide-react";
import { PlatformConfig } from "./types";

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
    icon: "MessageCircle",
    color: "text-purple-600",
    supportsVideo: true
  },
  {
    id: "tiktok",
    platform: "tiktok",
    displayName: "TikTok",
    icon: "Video",
    color: "text-pink-600",
    supportsVideo: true
  }
];