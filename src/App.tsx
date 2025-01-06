import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Index from './pages/Index';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <TooltipProvider>
            <div className="app">
              <Index />
              <Toaster />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;