import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  theme: string;
}

export const AuthForm = ({ theme }: AuthFormProps) => {
  return (
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
      view="sign_in"
      showLinks={true}
      localization={{
        variables: {
          sign_in: {
            email_label: "Email",
            password_label: "Password",
            button_label: "Sign In",
          },
          sign_up: {
            email_label: "Email",
            password_label: "Password",
            button_label: "Sign Up",
          },
        },
      }}
    />
  );
};