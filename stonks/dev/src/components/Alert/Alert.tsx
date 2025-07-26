import { Alert as MantineAlert, Progress } from '@mantine/core';
import { useState, useEffect } from 'react';

interface AlertProps {
  message: string;
  alertVisible: boolean;
  onClose: () => void;
  title?: string;
  color?: string;
}

export function Alert({
  message,
  alertVisible,
  onClose,
  title = "Alert",
  color = "yellow"
}: AlertProps) {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    if (message && alertVisible) {
      setProgress(100);

      const startTime = Date.now();
      const duration = 5000;

      const progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
      }, 50);

      return () => {
        clearInterval(progressTimer);
      };
    }
  }, [message, alertVisible]);

  if (!message) {return null;}

  return (
    <div className={`absolute top-32 left-6 right-6 z-20 transition-opacity duration-500 ease-in-out ${alertVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-yellow-200 dark:border-yellow-800">
        <MantineAlert
          color={color as any}
          title={title}
          className="mb-0"
          onClose={onClose}
          withCloseButton
        >
          {message}
          <Progress
            value={progress}
            color={color as any}
            size="sm"
            className="transition-all duration-100 ease-linear mt-3"
          />
        </MantineAlert>
      </div>
    </div>
  );
} 