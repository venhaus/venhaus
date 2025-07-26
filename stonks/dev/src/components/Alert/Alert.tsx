import { Alert as MantineAlert, Progress } from '@mantine/core';

interface AlertProps {
  message: string;
  alertVisible: boolean;
  alertProgress: number;
  onClose: () => void;
  title?: string;
  color?: string;
}

export function Alert({ 
  message, 
  alertVisible, 
  alertProgress, 
  onClose, 
  title = "Alert",
  color = "yellow"
}: AlertProps) {
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
            value={alertProgress} 
            color={color as any}
            size="sm"
            className="transition-all duration-100 ease-linear mt-3"
          />
        </MantineAlert>
      </div>
    </div>
  );
} 