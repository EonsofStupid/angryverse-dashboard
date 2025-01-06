import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import './App.css';
import Index from './pages/Index';

function App() {
  return (
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
  );
}

export default App;