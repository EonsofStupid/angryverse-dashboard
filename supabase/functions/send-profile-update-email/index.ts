import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  userId: string;
  updates: {
    username?: string;
    email?: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { userId, updates } = await req.json() as EmailRequest;

    // Get user's email
    const { data: user, error: userError } = await supabaseClient.auth
      .admin.getUserById(userId);

    if (userError || !user) {
      throw new Error('User not found');
    }

    // Construct email content
    const changes = Object.entries(updates)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');

    const emailContent = `
      <h2>Your profile has been updated</h2>
      <p>The following changes were made to your profile:</p>
      <pre>${changes}</pre>
      <p>If you did not authorize these changes, please contact support immediately.</p>
    `;

    // Send email using Supabase's built-in SMTP
    const { error: emailError } = await supabaseClient.auth.admin.sendEmail(
      user.email,
      {
        subject: 'Your profile has been updated',
        template_name: 'update-notification',
        template_data: {
          content: emailContent,
        }
      }
    );

    if (emailError) {
      throw emailError;
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});