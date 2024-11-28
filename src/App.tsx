import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { listenToAuthChanges } from './api/auth';
import { registerServiceWorker, requestNotificationPermission } from './service/notificationService';
import Toast from './components/common/Toast';
import { onMessage } from 'firebase/messaging';
import { messaging } from './api/firebaseConfig';

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
  })

  onMessage(messaging, (payload) => {

    const { title, body, icon } = payload.notification;
  
    alert('Message received. ' +  title +  body + icon);
  
    // 브라우저 알림 API를 사용하여 알림을 표시
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: icon,
      });
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

