import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Successfully signed in",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication error",
        description: error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "w-full px-3 py-2",
            "bg-background/50",
            "border border-primary/10",
            "focus:border-primary/30",
            "placeholder:text-muted-foreground"
          )}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cn(
            "w-full px-3 py-2",
            "bg-background/50",
            "border border-primary/10",
            "focus:border-primary/30",
            "placeholder:text-muted-foreground"
          )}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};