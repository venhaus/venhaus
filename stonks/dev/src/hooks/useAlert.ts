import { useState, useEffect } from 'react';

interface UseAlertReturn {
  alertVisible: boolean;
  alertProgress: number;
  message: string;
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

export function useAlert(): UseAlertReturn {
  const [message, setMessage] = useState<string>("");
  const [alertProgress, setAlertProgress] = useState<number>(100);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
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
          setMessage("");
          setAlertProgress(100);
        }, 500);
      }, duration);
      
      return () => {
        clearTimeout(hideTimer);
        clearInterval(progressTimer);
      };
    }
  }, [message]);

  const showAlert = (message: string) => {
    setMessage(message);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setTimeout(() => {
      setMessage("");
      setAlertProgress(100);
    }, 500);
  };

  return {
    alertVisible,
    alertProgress,
    message,
    showAlert,
    hideAlert,
  };
} 