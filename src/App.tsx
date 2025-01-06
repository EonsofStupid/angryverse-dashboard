import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import { PostsManagement } from "@/components/admin/content/PostsManagement";
import { PortalContent } from "@/components/portal/PortalContent";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="posts" element={<PostsManagement />} />
              <Route path="portal" element={<PortalContent />} />
            </Route>
          </Routes>
          <Toaster />
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;