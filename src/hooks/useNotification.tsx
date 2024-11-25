import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getNotification, setNotification } from '../api/database';
import useAuthStore from '../store/authStore';

export default function UseNotification() {
  const authUser = useAuthStore.getState() ?? {};
    
  if (!authUser) {
    throw new Error('User is not authenticated');
  }
  const uid = authUser.user?.uid;

  const queryClient = useQueryClient();

  const notificationQuery = useQuery({
    queryKey: ['notification'],
    queryFn: () => getNotification(uid),
  });

  const saveNotification = useMutation({
    mutationFn: (notification) => setNotification(uid, notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });
  
  return { notificationQuery, saveNotification };
}
