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
    registerServiceWorker();
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
      {/* Footer with contact information */}
      <footer className=" bg-gray-800 text-white">
        <div className="container mx-auto text-center text-sm">
          <p>수정 및 요청 사항이 있으시면 연락주세요. 메일주소: <a href="mailto:runal.app@gmail.com">runal.app@gmail.com</a></p>
        </div>
      </footer>
      <Toast />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

