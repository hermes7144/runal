import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getNotification, setNotification } from '../api/database';
import useAuthStore from '../store/authStore';

export default function useNotification() {
  const authUser = useAuthStore.getState()?.user;

  if (!authUser || !authUser.uid) {
    throw new Error('User is not authenticated or UID is missing');
  }
  const uid = authUser.uid;

  const queryClient = useQueryClient();

  const notificationQuery = useQuery({
    queryKey: ['notification', uid],
    queryFn: () => getNotification(uid),
  });

  const saveNotification = useMutation({
    mutationFn: (notification) => setNotification(uid, notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification', uid] });
    },
  });
  
  return { notificationQuery, saveNotification };
}
