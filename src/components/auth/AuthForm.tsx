import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";

interface AuthFormProps {
  theme: string;
}

export const AuthForm = ({ theme }: AuthFormProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('AuthForm mounted');
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed in AuthForm:', event, session?.user?.id);
      
      if (event === 'SIGNED_OUT') {
        console.log('User signed out, clearing error state');
        setError(null);
      }

      if (event === 'SIGNED_IN') {
        console.log('User signed in successfully');
      }

      if (event === 'USER_UPDATED') {
        console.log('User profile updated');
      }

      // Check session validity on specific events
      if (event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
        const checkSession = async () => {
          const { error: sessionError } = await supabase.auth.getSession();
          if (sessionError) {
            console.error('Session error:', sessionError);
            setError(sessionError.message);
          }
        };
        checkSession();
      }
    });

    return () => {
      console.log('AuthForm unmounting, cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "hsl(var(--primary))",
                brandAccent: "hsl(var(--primary))",
              },
            },
          },
          className: {
            container: 'auth-container',
            button: 'auth-button',
            input: 'auth-input',
          }
        }}
        theme={theme === "dark" ? "dark" : "light"}
        providers={[]}
        redirectTo={window.location.origin}
        localization={{
          variables: {
            sign_in: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Sign In",
              loading_button_label: "Signing in...",
            },
            sign_up: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Sign Up",
              loading_button_label: "Signing up...",
            },
          },
        }}
      />
    </div>
  );
};