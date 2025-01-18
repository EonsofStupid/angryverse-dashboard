import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { ThemeMinimal } from '@supabase/auth-ui-shared';
import type { Theme } from '@/types/theme';

interface AuthFormProps {
  theme: Theme | null;
}

export const AuthForm = ({ theme }: AuthFormProps) => {
  const appearance = {
    theme: ThemeMinimal,
    variables: {
      default: {
        colors: {
          brand: 'hsl(var(--primary))',
          brandAccent: 'hsl(var(--primary-light))',
          brandButtonText: 'hsl(var(--primary-foreground))',
        },
        space: {
          buttonPadding: '1.5rem',
          inputPadding: '1.5rem',
        },
        borderWidths: {
          buttonBorderWidth: '1px',
          inputBorderWidth: '1px',
        },
        radii: {
          borderRadiusButton: '0.5rem',
          buttonBorderRadius: '0.5rem',
          inputBorderRadius: '0.5rem',
        },
      },
    },
    className: {
      container: cn(
        'w-full space-y-4',
        'animate-in fade-in-0 slide-in-from-top-2'
      ),
      button: cn(
        'w-full px-6 py-3',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'inline-flex items-center justify-center',
        'rounded-md text-sm font-medium',
        'ring-offset-background transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'glass hover:glass-glow'
      ),
      input: cn(
        'flex h-10 w-full',
        'rounded-md border border-input',
        'bg-background px-3 py-2',
        'text-sm ring-offset-background',
        'file:border-0 file:bg-transparent',
        'file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'glass'
      ),
      label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      loader: 'animate-spin text-primary',
    },
  };

  return (
    <div className="p-4">
      <Auth
        supabaseClient={supabase}
        appearance={appearance}
        providers={['google', 'github']}
        redirectTo={`${window.location.origin}/auth/callback`}
        magicLink={true}
      />
    </div>
  );
};