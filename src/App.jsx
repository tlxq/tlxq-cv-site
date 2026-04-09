import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageProvider';
import LoadingScreen from './components/LoadingScreen';
import CVLayout from './components/CVLayout';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setIsLoading(false);
  };

  return (
    <LanguageProvider>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <CVLayout />
      )}
    </LanguageProvider>
  );
}

export default App;
