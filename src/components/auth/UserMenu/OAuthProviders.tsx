import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail } from "lucide-react";
import { Provider } from "@supabase/supabase-js";

export const OAuthProviders = () => {
  const { toast } = useToast();

  const handleOAuthSignIn = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('OAuth sign in error:', error);
      toast({
        title: "Error",
        description: "Failed to sign in with provider",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn('github')}
      >
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn('google')}
      >
        <Mail className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  );
};