import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import AdminDashboard from "@/pages/AdminDashboard";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;