import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { listenToAuthChanges } from './api/auth';
import { registerServiceWorker, requestNotificationPermission } from './service/notificationService';
import Toast from './components/common/Toast';
import { getSubscribers } from './api/database';

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

  // useEffect(() => {
  //   onMessage(messaging, (payload) => {
  //     console.log('Foreground message received:', payload);
  
  //     // 포그라운드에서만 알림을 직접 표시
  //     new Notification(payload.notification.title, {
  //       body: payload.notification.body,
  //       icon: payload.notification.icon,
  //     });
  //   });
  // }, []);

  useEffect(() => {
    // 비동기 작업을 위한 함수 정의
    const fetchSubscribers = async () => {
      try {
        const temp = await getSubscribers('pczpCym3cUSfKZcSzECI');
        console.log(temp); // 결과 확인
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchSubscribers(); // 함수 호출
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트 마운트 시 한 번 실행


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

