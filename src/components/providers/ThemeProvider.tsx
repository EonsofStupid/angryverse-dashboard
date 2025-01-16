import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();
  const { isAdmin } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Apply different theme based on route
    if (location.pathname.startsWith("/admin") && isAdmin) {
      setTheme("admin");
    } else {
      setTheme("default");
    }
  }, [location.pathname, isAdmin, setTheme]);

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={theme}
      value={{
        default: "default",
        admin: "admin",
      }}
    >
      {children}
    </NextThemeProvider>
  );
}