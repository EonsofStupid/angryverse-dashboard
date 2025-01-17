import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { ThemeMinimal } from '@supabase/auth-ui-shared';

interface AuthFormProps {
  theme?: 'site' | 'admin';
}

export const AuthForm = ({ theme = 'site' }: AuthFormProps) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeMinimal,
          variables: {
            default: {
              colors: {
                brand: 'var(--primary)',
                brandAccent: 'var(--primary-foreground)',
              },
            },
          },
        }}
        providers={[]}
      />
    </div>
  );
};