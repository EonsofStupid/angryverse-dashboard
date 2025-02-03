import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useRoleCheck = (user: User | null, requiredRole: string) => {
  const [hasRole, setHasRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      console.log('Role Check: Starting role check for user', { 
        userId: user?.id, 
        requiredRole 
      });

      if (!user) {
        console.log('Role Check: No user provided, setting hasRole to false');
        if (isMounted) {
          setHasRole(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        // Log the role check attempt
        await supabase.from('auth_security_logs').insert({
          user_id: user.id,
          event_type: 'role_check',
          metadata: {
            required_role: requiredRole,
            timestamp: new Date().toISOString()
          }
        });

        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Role Check: Error checking role:', error);
          toast({
            title: "Error Checking Permissions",
            description: "There was an error verifying your access level. Please try again.",
            variant: "destructive"
          });
          
          if (isMounted) {
            setHasRole(false);
          }
          return;
        }

        // Modified logic to handle both admin and super_admin roles
        const roleMatches = requiredRole === 'admin' 
          ? (data?.role === 'admin' || data?.role === 'super_admin')
          : data?.role === requiredRole;

        console.log('Role Check: Role verification result', { 
          userRole: data?.role,
          requiredRole,
          hasRole: roleMatches
        });

        // Log the role check result
        await supabase.from('auth_security_logs').insert({
          user_id: user.id,
          event_type: 'role_check_result',
          metadata: {
            required_role: requiredRole,
            has_role: roleMatches,
            timestamp: new Date().toISOString()
          }
        });

        if (isMounted) {
          setHasRole(roleMatches);
          if (!roleMatches) {
            toast({
              title: "Access Denied",
              description: "You don't have the required permissions to access this area.",
              variant: "destructive"
            });
          }
        }
      } catch (err) {
        console.error('Role Check: Error in role check:', err);
        toast({
          title: "System Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive"
        });
        if (isMounted) {
          setHasRole(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [user, requiredRole]);

  return { hasRole, isLoading };
};