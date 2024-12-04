import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { listenToAuthChanges } from './api/auth';
import { registerServiceWorker, requestNotificationPermission } from './service/notificationService';
import Toast from './components/common/Toast';

const MINUTE = 1000 * 60;

function App() {
  useEffect(() => {
    requestNotificationPermission();
    // registerServiceWorker();
    listenToAuthChanges();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * MINUTE,
        gcTime: 10 * MINUTE,
      },
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Toast />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

