import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { ThemeMinimal } from '@supabase/auth-ui-shared';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export const AuthForm = () => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('Signed in:', session?.user?.id);
        toast({
          title: "Success",
          description: "Successfully signed in",
        });
      } else if (event === 'SIGNED_OUT') {
        console.log('Signed out');
      } else if (event === 'USER_UPDATED') {
        console.log('User updated:', session?.user?.id);
      } else if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Password Recovery",
          description: "Check your email for password reset instructions",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

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
        'w-full space-y-6',
        'animate-in fade-in-0 slide-in-from-top-2'
      ),
      button: cn(
        'w-full px-6 py-3',
        'bg-primary/90 text-primary-foreground',
        'inline-flex items-center justify-center gap-2',
        'rounded-md text-sm font-medium',
        'ring-offset-background',
        'glass backdrop-blur-md border border-white/10',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.02] hover:-translate-y-0.5',
        'hover:bg-primary/95 hover:shadow-lg',
        'hover:shadow-primary/20 hover:border-primary/30',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'after:absolute after:inset-0',
        'after:rounded-md after:transition-opacity',
        'after:opacity-0 hover:after:opacity-100',
        'after:bg-gradient-to-r after:from-primary/0',
        'after:via-primary/10 after:to-primary/0',
        'disabled:pointer-events-none disabled:opacity-50'
      ),
      input: cn(
        'flex h-10 w-full',
        'rounded-md border border-input/10',
        'px-3 py-2 text-sm',
        'glass backdrop-blur-md',
        'bg-background/5',
        'transition-all duration-300',
        'hover:border-primary/30 hover:bg-background/10',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'text-foreground/90',
        'placeholder:text-muted-foreground/50',
        'disabled:cursor-not-allowed disabled:opacity-50'
      ),
      label: cn(
        'text-sm font-medium leading-none',
        'text-foreground/90',
        'mb-2 block',
        'transition-colors duration-200',
        'group-hover:text-primary'
      ),
      loader: cn(
        'animate-spin text-primary',
        'after:absolute after:w-full after:h-full',
        'after:border-2 after:border-primary',
        'after:border-r-transparent after:rounded-full'
      ),
      anchor: cn(
        'text-sm text-primary/90 hover:text-primary',
        'transition-colors duration-200',
        'hover:underline'
      ),
      divider: cn(
        'my-4 flex items-center text-xs text-muted-foreground',
        'before:flex-1 before:border-t',
        'after:flex-1 after:border-t',
        'before:border-muted/20 after:border-muted/20'
      ),
      message: cn(
        'text-sm text-muted-foreground',
        'animate-in fade-in-0 slide-in-from-top-1'
      ),
      providers: {
        github: cn(
          'bg-[#24292F]/90 hover:bg-[#24292F]/95',
          'text-white',
          'hover:shadow-[#24292F]/20'
        ),
        google: cn(
          'bg-white/90 hover:bg-white/95',
          'text-[#24292F]',
          'hover:shadow-white/20',
          'border-gray-200'
        ),
      },
    },
  };

  return (
    <div className={cn(
      'p-4 rounded-lg',
      'glass backdrop-blur-md',
      'border border-white/10',
      'animate-in fade-in-0 slide-in-from-top-2',
      'shadow-xl shadow-primary/5'
    )}>
      <Auth
        supabaseClient={supabase}
        appearance={appearance}
        providers={['google', 'github']}
        redirectTo={`${window.location.origin}/auth/callback`}
        magicLink={true}
        view="sign_in"
        showLinks={true}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email',
              password_label: 'Password',
            },
          },
        }}
      />
    </div>
  );
};