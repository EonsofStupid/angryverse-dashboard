import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import { PostsManagement } from "@/components/admin/content/PostsManagement";
import { PortalContent } from "@/components/portal/PortalContent";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useRoleCheck } from "@/hooks/useRoleCheck";

const queryClient = new QueryClient();

// Protected route component that checks auth and admin role
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin, isLoading } = useRoleCheck(user, 'admin');

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }>
              <Route path="posts" element={<PostsManagement />} />
              <Route path="portal" element={<PortalContent />} />
            </Route>

            {/* Portal route that also uses admin dashboard */}
            <Route path="/portal" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }>
              <Route index element={<PortalContent />} />
            </Route>
          </Routes>
          <Toaster />
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;