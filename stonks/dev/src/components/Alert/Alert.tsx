import { Alert as MantineAlert, Progress } from '@mantine/core';

interface AlertProps {
  symbolNotFound: string;
  alertVisible: boolean;
  alertProgress: number;
  onClose: () => void;
}

export function Alert({ symbolNotFound, alertVisible, alertProgress, onClose }: AlertProps) {
  if (!symbolNotFound) {return null;}

  return (
    <div className={`absolute top-32 left-6 right-6 z-20 transition-opacity duration-500 ease-in-out ${alertVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-yellow-200 dark:border-yellow-800">
        <MantineAlert 
          color="yellow" 
          title="Symbol not found" 
          className="mb-0"
          onClose={onClose}
          withCloseButton
        >
          The symbol "{symbolNotFound}" was not found. Please check the spelling and try again.
          <Progress 
            value={alertProgress} 
            color="yellow" 
            size="sm"
            className="transition-all duration-100 ease-linear mt-3"
          />
        </MantineAlert>
      </div>
    </div>
  );
} 