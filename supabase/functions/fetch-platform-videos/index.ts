import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VideoResponse {
  videos: Array<{
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
    metrics: {
      views?: number;
      likes?: number;
      comments?: number;
      shares?: number;
      followers?: number;
      subscribers?: number;
    };
    platformId: string;
    url: string;
  }>;
}

async function fetchYouTubeVideos(accessToken: string) {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&mine=true`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    console.error('YouTube API Error:', await response.text());
    throw new Error('Failed to fetch YouTube videos');
  }

  const data = await response.json();
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
    metrics: {
      // We'll need another API call to get these metrics
      views: 0,
      likes: 0,
      comments: 0
    },
    platformId: item.id.videoId,
    url: `https://youtube.com/watch?v=${item.id.videoId}`
  }));
}

async function fetchTwitchVideos(accessToken: string, userId: string) {
  const response = await fetch(
    `https://api.twitch.tv/helix/videos?user_id=${userId}`,
    {
      headers: {
        'Client-ID': Deno.env.get('TWITCH_CLIENT_ID') || '',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error('Twitch API Error:', await response.text());
    throw new Error('Failed to fetch Twitch videos');
  }

  const data = await response.json();
  return data.data.map((video: any) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail_url,
    publishedAt: video.created_at,
    metrics: {
      views: video.view_count,
    },
    platformId: video.id,
    url: video.url
  }));
}

async function fetchFacebookVideos(accessToken: string, pageId: string) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${pageId}/videos?fields=id,title,description,created_time,thumbnails,views`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error('Facebook API Error:', await response.text());
    throw new Error('Failed to fetch Facebook videos');
  }

  const data = await response.json();
  return data.data.map((video: any) => ({
    id: video.id,
    title: video.title || 'Untitled Video',
    description: video.description || '',
    thumbnailUrl: video.thumbnails?.data[0]?.uri || '',
    publishedAt: video.created_time,
    metrics: {
      views: video.views?.total_views || 0,
    },
    platformId: video.id,
    url: `https://facebook.com/${video.id}`
  }));
}

async function fetchTikTokVideos(accessToken: string) {
  const response = await fetch(
    'https://open.tiktokapis.com/v2/video/list/',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        max_count: 10,
      }),
    }
  );

  if (!response.ok) {
    console.error('TikTok API Error:', await response.text());
    throw new Error('Failed to fetch TikTok videos');
  }

  const data = await response.json();
  return data.data.videos.map((video: any) => ({
    id: video.id,
    title: video.title,
    description: video.video_description,
    thumbnailUrl: video.cover_image_url,
    publishedAt: video.create_time,
    metrics: {
      likes: video.like_count,
      comments: video.comment_count,
      shares: video.share_count,
      views: video.view_count,
    },
    platformId: video.id,
    url: video.share_url
  }));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platform, connectionId } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseKey) throw new Error('Missing Supabase environment variables');
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get connection details
    const { data: connection, error: connectionError } = await supabase
      .from('social_connections')
      .select('*')
      .eq('id', connectionId)
      .single();

    if (connectionError || !connection) {
      console.error('Connection error:', connectionError);
      throw new Error('Connection not found');
    }

    if (!connection.access_token) {
      throw new Error('No access token available');
    }

    let videos = [];
    console.log(`Fetching videos for platform: ${platform}`);
    
    try {
      switch (platform) {
        case 'youtube':
          videos = await fetchYouTubeVideos(connection.access_token);
          break;

        case 'twitch':
          if (!connection.platform_user_id) {
            throw new Error('No Twitch user ID available');
          }
          videos = await fetchTwitchVideos(connection.access_token, connection.platform_user_id);
          break;

        case 'facebook_video':
          if (!connection.platform_user_id) {
            throw new Error('No Facebook page ID available');
          }
          videos = await fetchFacebookVideos(connection.access_token, connection.platform_user_id);
          break;

        case 'tiktok':
          videos = await fetchTikTokVideos(connection.access_token);
          break;

        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      console.log(`Successfully fetched ${videos.length} videos for ${platform}`);
    } catch (error) {
      console.error(`Error fetching ${platform} videos:`, error);
      throw error;
    }

    const response: VideoResponse = { videos };
    
    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});