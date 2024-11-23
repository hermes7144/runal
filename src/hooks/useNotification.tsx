import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getNotification, setNotification } from '../api/database';
import useAuthStore from '../store/authStore';

export default function UseNotification() {
  const userId = useAuthStore.getState().user?.uid ?? '';
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();

  const notificationQuery = useQuery({
    queryKey: ['notification'],
    queryFn: () => getNotification(userId),
  });

  const saveNotification = useMutation({
    mutationFn: (notification) => setNotification(userId, notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });

  const cancelNotification = () => {

  }

  const subscribeNotification = () => {
    
  }
  
  return { notificationQuery, saveNotification };
}
