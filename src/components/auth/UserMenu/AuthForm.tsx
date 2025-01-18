import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
importI understand - you want the hCaptcha added ONLY to the password login while preserving 100% of your existing functionality and styling. Let me implement this exactly.

<lov-code>
Let's add hCaptcha to the password flow in AuthForm.tsx:

<lov-write file_path="src/components/auth/UserMenu/AuthForm.tsx">
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { ThemeMinimal } from '@supabase/auth-ui-shared';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export const AuthForm = () => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('Signed in:', session?.user?.id);
      } else if (event === 'SIGNED_OUT') {
        console.log('Signed out');
      } else if (event === 'USER_UPDATED') {
        console.log('User updated:', session?.user?.id);
      } else if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Password Recovery",
          description: "Check your email for password reset instructions",
        });
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed');
      } else if (event === 'INITIAL_SESSION') {
        console.log('Initial session loaded');
      } else {
        // Handle any unexpected errors
        console.error('Auth event:', event);
        toast({
          title: "Authentication Status",
          description: "Authentication state changed",
          variant: "destructive"
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
        // Base button styles
        'w-full px-6 py-3',
        'bg-primary/90 text-primary-foreground',
        'inline-flex items-center justify-center gap-2',
        'rounded-md text-sm font-medium',
        'ring-offset-background',
        // Glass effect
        'glass backdrop-blur-md border border-white/10',
        // Hover animations
        'transition-all duration-300 ease-out',
        'hover:scale-[1.02] hover:-translate-y-0.5',
        'hover:bg-primary/95 hover:shadow-lg',
        'hover:shadow-primary/20 hover:border-primary/30',
        // Focus styles
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        // Special effects
        'after:absolute after:inset-0',
        'after:rounded-md after:transition-opacity',
        'after:opacity-0 hover:after:opacity-100',
        'after:bg-gradient-to-r after:from-primary/0',
        'after:via-primary/10 after:to-primary/0',
        // Disabled state
        'disabled:pointer-events-none disabled:opacity-50'
      ),
      input: cn(
        // Base input styles
        'flex h-10 w-full',
        'rounded-md border border-input/10',
        'px-3 py-2 text-sm',
        // Glass effect
        'glass backdrop-blur-md',
        'bg-background/5',
        // Focus & hover states
        'transition-all duration-300',
        'hover:border-primary/30 hover:bg-background/10',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        // Placeholder & text
        'text-foreground/90',
        'placeholder:text-muted-foreground/50',
        // Disabled state
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
      // Provider-specific buttons
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

  // Add localization for hCaptcha
  const localization = {
    auth: {
      sign_in: {
        password_label: 'Password',
        email_label: 'Email',
        email_input_placeholder: 'Your email',
        password_input_placeholder: 'Your password',
        button_label: 'Sign in',
        loading_button_label: 'Signing in...',
        social_provider_text: 'Sign in with {{provider}}',
        link_text: 'Already have an account? Sign in',
      },
      sign_up: {
        password_label: 'Password',
        email_label: 'Email',
        email_input_placeholder: 'Your email',
        password_input_placeholder: 'Your password',
        button_label: 'Sign up',
        loading_button_label: 'Signing up...',
        social_provider_text: 'Sign up with {{provider}}',
        link_text: "Don't have an account? Sign up",
      },
      magic_link: {
        email_input_label: 'Email address',
        email_input_placeholder: 'Your email',
        button_label: 'Send Magic Link',
        loading_button_label: 'Sending magic link...',
        link_text: 'Send a magic link email',
      },
      forgotten_password: {
        email_label: 'Email',
        password_label: 'Password',
        email_input_placeholder: 'Your email',
        button_label: 'Send reset instructions',
        loading_button_label: 'Sending reset instructions...',
        link_text: 'Forgot your password?',
      },
      captcha_text: 'Please complete the captcha to continue',
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
        localization={localization}
        view="sign_in"
        showLinks={true}
      />
      <div className="mt-4">
        <HCaptcha
          sitekey="your-site-key"
          theme="dark"
          size="normal"
          onVerify={(token) => {
            console.log('hCaptcha Token:', token);
          }}
        />
      </div>
    </div>
  );
};