import { FormEvent, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = await signIn(email, password);
    if (error) {
      toast({
        title: "Authentication error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Successfully signed in",
        description: "Welcome back!",
      });
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