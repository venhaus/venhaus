import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './pages/App.page'

const router = createBrowserRouter([
  {
    path: '/stonks',
    element: <App />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
