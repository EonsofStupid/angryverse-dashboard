import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import AdminDashboard from "@/pages/AdminDashboard";
import { Social_Portal } from "@/components/admin/social_portal/Social_Portal";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/*" element={<AdminDashboard />}>
              <Route path="portal/*" element={<Social_Portal />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;