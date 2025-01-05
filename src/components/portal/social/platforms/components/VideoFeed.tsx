import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoContent } from "../types";
import { formatDistanceToNow } from "date-fns";

interface VideoFeedProps {
  videos: VideoContent[];
  onAddToPost: (video: VideoContent) => void;
}

export const VideoFeed = ({ videos, onAddToPost }: VideoFeedProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <Card key={video.id}>
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full aspect-video object-cover rounded-md"
              />
              <p className="text-sm text-muted-foreground line-clamp-3">
                {video.description}
              </p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatDistanceToNow(new Date(video.publishedAt))} ago</span>
                <div className="flex gap-4">
                  {video.metrics.views && <span>{video.metrics.views} views</span>}
                  {video.metrics.likes && <span>{video.metrics.likes} likes</span>}
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onAddToPost(video)}
              >
                Add to Posts
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};