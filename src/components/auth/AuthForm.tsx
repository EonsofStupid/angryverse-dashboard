import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

interface AuthFormProps {
  theme: string;
}

export const AuthForm = ({ theme }: AuthFormProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setError(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleError = (error: AuthError) => {
    console.error("Auth error:", error);
    switch (error.message) {
      case 'Invalid login credentials':
        setError('Invalid email or password. Please try again.');
        break;
      case 'User not found':
        setError('No account found with these credentials.');
        break;
      default:
        setError(error.message);
    }
  };

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