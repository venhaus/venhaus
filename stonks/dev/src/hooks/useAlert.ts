import { useState, useEffect } from 'react';

interface UseAlertReturn {
  alertVisible: boolean;
  alertProgress: number;
  symbolNotFound: string;
  showAlert: (symbol: string) => void;
  hideAlert: () => void;
}

export function useAlert(): UseAlertReturn {
  const [symbolNotFound, setSymbolNotFound] = useState<string>("");
  const [alertProgress, setAlertProgress] = useState<number>(100);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    if (symbolNotFound) {
      setAlertVisible(true);
      setAlertProgress(100);
      
      const startTime = Date.now();
      const duration = 5000;
      
      const progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setAlertProgress(remaining);
      }, 50);
      
      const hideTimer = setTimeout(() => {
        setAlertVisible(false);
        setTimeout(() => {
          setSymbolNotFound("");
          setAlertProgress(100);
        }, 500);
      }, duration);
      
      return () => {
        clearTimeout(hideTimer);
        clearInterval(progressTimer);
      };
    }
  }, [symbolNotFound]);

  const showAlert = (symbol: string) => {
    setSymbolNotFound(symbol);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setTimeout(() => {
      setSymbolNotFound("");
      setAlertProgress(100);
    }, 500);
  };

  return {
    alertVisible,
    alertProgress,
    symbolNotFound,
    showAlert,
    hideAlert,
  };
} 