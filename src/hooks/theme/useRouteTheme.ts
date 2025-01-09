import { useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useRouteTheme = () => {
  const location = useLocation();
  const { setCurrentTheme, currentTheme } = useTheme();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        // First try to get a page-specific theme
        const { data: pageTheme, error: pageError } = await supabase
          .from('page_themes')
          .select(`
            theme_id,
            themes (*)
          `)
          .eq('page_path', location.pathname)
          .maybeSingle();

        if (pageError) throw pageError;

        if (pageTheme?.themes) {
          setCurrentTheme(pageTheme.themes);
          return;
        }

        // If no page theme, get the default theme based on route type
        const { data: themeData, error: themeError } = await supabase
          .from('themes')
          .select('*')
          .eq(isAdminRoute ? 'name' : 'is_default', isAdminRoute ? 'Admin Theme' : true)
          .maybeSingle();

        if (themeError) throw themeError;

        if (themeData) {
          setCurrentTheme(themeData);
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };

    fetchTheme();
  }, [location.pathname, setCurrentTheme, isAdminRoute]);

  return {
    isAdminRoute,
    currentTheme,
    pathname: location.pathname,
  };
};