import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider defaultColorScheme='auto' theme={theme}>
      <Router />
    </MantineProvider>
  );
}
