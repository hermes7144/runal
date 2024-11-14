import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';
import { useEffect } from 'react';
import { initializeAuthListener } from './store/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MINUTE = 1000 * 60;

function App() {
  useEffect(() => {
    initializeAuthListener();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * MINUTE,
        gcTime: 10 * MINUTE,
      },
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;

