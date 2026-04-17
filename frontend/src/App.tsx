import { useState, useEffect } from 'react';
import GreetingPage from './components/GreetingPage';
import ChoicePage from './components/ChoicePage';
import RewardPage from './components/RewardPage';
import ReluctancePage from './components/ReluctancePage';
import SurrenderPage from './components/SurrenderPage';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [poemStanzas, setPoemStanzas] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        setLoading(true);
        // Determine API endpoint
        const isDevelopment = import.meta.env.DEV;
        const apiUrl = isDevelopment 
          ? 'http://localhost:8000/poem'  // Local development
          : '/api/poem';  // Production (Vercel handles /api/* routing)
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.success) {
          setPoemStanzas(data.stanzas);
        }
      } catch (error) {
        console.error('Failed to fetch poem:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, []);

  const renderPage = () => {
    const commonProps = { setCurrentPage, poemStanzas };

    switch (currentPage) {
      case 1:
        return <GreetingPage {...commonProps} />;
      case 2:
        return <ChoicePage {...commonProps} />;
      case 3:
        return <RewardPage {...commonProps} />;
      case 4:
        return <ReluctancePage {...commonProps} />;
      case 5:
        return <SurrenderPage {...commonProps} />;
      default:
        return <GreetingPage {...commonProps} />;
    }
  };

  if (loading && poemStanzas.length === 0) {
    return <div className="main-card">Loading...</div>;
  }

  return (
    <div className="app-shell">
      <div className="main-card">
        {renderPage()}
      </div>
    </div>
  );
}
