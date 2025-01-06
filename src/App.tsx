import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import './App.css';
import Index from './pages/Index';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <TooltipProvider>
          <div className="app">
            <Index />
            <Toaster />
          </div>
        </TooltipProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;