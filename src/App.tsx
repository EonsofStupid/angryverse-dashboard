import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import './App.css';
import Index from './pages/Index';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <Index />
          <Toaster />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;