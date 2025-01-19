import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthError } from '@supabase/supabase-js';
import { useAuthStore } from '@/store/useAuthStore'; // <-- import your store
import { useToast } from "@/hooks/use-toast";

export const EmailPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithPassword } = useAuthStore(); // <-- destructure store action
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signInWithPassword(email, password);
      toast({
        title: "Success",
        description: "Successfully signed in",
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error('Sign in error:', authError);
      toast({
        title: "Error signing in",
        description: authError.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign in with Email"}
      </Button>

      <Button
        type="button"
        variant="link"
        className="w-full text-sm text-muted-foreground"
        onClick={() => {
          toast({
            title: "Reset password",
            description: "Password reset functionality coming soon",
          });
        }}
      >
        Forgot password?
      </Button>
    </form>
  );
};
