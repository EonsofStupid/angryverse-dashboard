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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { platform, connectionId } = await req.json()
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !supabaseKey) throw new Error('Missing Supabase environment variables')
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get connection details
    const { data: connection, error: connectionError } = await supabase
      .from('social_connections')
      .select('*')
      .eq('id', connectionId)
      .single()

    if (connectionError || !connection) {
      throw new Error('Connection not found')
    }

    let videos = []
    
    switch (platform) {
      case 'youtube':
        if (!connection.access_token) throw new Error('No access token available')
        // Implement YouTube API call here
        // For now returning mock data
        videos = [{
          id: 'youtube1',
          title: 'Sample YouTube Video',
          description: 'This is a sample YouTube video description',
          thumbnailUrl: 'https://picsum.photos/seed/youtube/400/225',
          publishedAt: new Date().toISOString(),
          metrics: {
            views: 1000,
            likes: 100,
            comments: 50,
            subscribers: 5000
          },
          platformId: 'yt123',
          url: 'https://youtube.com/watch?v=sample'
        }]
        break

      case 'twitch':
        if (!connection.access_token) throw new Error('No access token available')
        // Implement Twitch API call here
        videos = [{
          id: 'twitch1',
          title: 'Sample Twitch Stream',
          description: 'This is a sample Twitch stream description',
          thumbnailUrl: 'https://picsum.photos/seed/twitch/400/225',
          publishedAt: new Date().toISOString(),
          metrics: {
            views: 500,
            followers: 2000
          },
          platformId: 'tw123',
          url: 'https://twitch.tv/sample'
        }]
        break

      case 'rumble':
        // Implement Rumble API call here
        videos = [{
          id: 'rumble1',
          title: 'Sample Rumble Video',
          description: 'This is a sample Rumble video description',
          thumbnailUrl: 'https://picsum.photos/seed/rumble/400/225',
          publishedAt: new Date().toISOString(),
          metrics: {
            views: 300,
            likes: 50,
            comments: 20
          },
          platformId: 'rb123',
          url: 'https://rumble.com/sample'
        }]
        break

      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }

    const response: VideoResponse = { videos }
    
    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})