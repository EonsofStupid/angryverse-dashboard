import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function fetchYouTubeVideos(accessToken: string) {
  try {
    console.log('Starting YouTube video fetch process...');
    
    if (!accessToken) {
      throw new Error('No access token provided');
    }

    console.log('Access token present, attempting to fetch channel data...');
    
    // First try to fetch user's channel info to validate token
    const channelResponse = await fetch(
      'https://youtube.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
      {
        headers: {
          'Authorization': `Bearer ${accessToken.trim()}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!channelResponse.ok) {
      const errorData = await channelResponse.text();
      console.error('Channel validation failed:', errorData);
      throw new Error(`YouTube API authentication failed: ${errorData}`);
    }

    const channelData = await channelResponse.json();
    console.log('Channel validation successful:', channelData?.items?.[0]?.snippet?.title);
    
    // Now fetch the videos
    console.log('Fetching videos...');
    const response = await fetch(
      'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&mine=true',
      {
        headers: {
          'Authorization': `Bearer ${accessToken.trim()}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API Error:', errorText);
      throw new Error(`YouTube API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched YouTube videos:', data.items?.length || 0);
    
    if (!data.items || data.items.length === 0) {
      console.log('No videos found for this channel');
      return [];
    }

    // Get video statistics in a separate call
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    const statsResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken.trim()}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!statsResponse.ok) {
      console.error('Failed to fetch video statistics');
      throw new Error('Failed to fetch video statistics');
    }

    const statsData = await statsResponse.json();
    const statsMap = new Map(
      statsData.items.map((item: any) => [item.id, item.statistics])
    );

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      metrics: {
        views: parseInt(statsMap.get(item.id.videoId)?.viewCount || '0'),
        likes: parseInt(statsMap.get(item.id.videoId)?.likeCount || '0'),
        comments: parseInt(statsMap.get(item.id.videoId)?.commentCount || '0')
      },
      platformId: item.id.videoId,
      url: `https://youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('Error in fetchYouTubeVideos:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platform, connectionId } = await req.json();
    console.log(`Processing request for platform: ${platform}, connectionId: ${connectionId}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
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
    
    switch (platform) {
      case 'youtube':
        videos = await fetchYouTubeVideos(connection.access_token);
        break;

      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    console.log(`Successfully fetched ${videos.length} videos for ${platform}`);
    
    return new Response(
      JSON.stringify({ videos }),
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
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});