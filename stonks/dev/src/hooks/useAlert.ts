import { useState, useEffect } from 'react';

interface UseAlertReturn {
  alertVisible: boolean;
  message: string;
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

export function useAlert(): UseAlertReturn {
  const [message, setMessage] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setAlertVisible(true);

      const hideTimer = setTimeout(() => {
        setAlertVisible(false);
        setTimeout(() => {
          setMessage("");
        }, 500);
      }, 5000);

      return () => {
        clearTimeout(hideTimer);
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
    }, 500);
  };

  return {
    alertVisible,
    message,
    showAlert,
    hideAlert,
  };
} 