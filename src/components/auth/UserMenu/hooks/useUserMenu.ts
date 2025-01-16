import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/integrations/supabase/client';

export const useUserMenu = () => {
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          if (session) {
            setUser(session.user);
            setOpen(false);
            navigate('/');
            toast({
              title: "Welcome back!",
              description: "You have successfully signed in.",
            });
          }
          break;
        case 'SIGNED_OUT':
          setUser(null);
          toast({
            title: "Signed out",
            description: "You have been successfully signed out.",
          });
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, setUser]);

  const handleOpenChange = (isOpen: boolean) => {
    setIsAnimating(true);
    setOpen(isOpen);
  };

  return {
    open,
    isAnimating,
    handleOpenChange,
    user
  };
};