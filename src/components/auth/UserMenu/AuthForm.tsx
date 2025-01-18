import { cn } from "@/lib/utils";
import { EmailPasswordForm } from "./EmailPasswordForm";
import { OAuthProviders } from "./OAuthProviders";
import { Separator } from "@/components/ui/separator";

export const AuthForm = () => {
  return (
    <div className={cn(
      'p-4 rounded-lg',
      'glass backdrop-blur-md',
      'border border-white/10',
      'animate-in fade-in-0 slide-in-from-top-2',
      'shadow-xl shadow-primary/5'
    )}>
      <div className="space-y-6">
        <EmailPasswordForm />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <OAuthProviders />
      </div>
    </div>
  );
};