import React from 'react';
import useAuthStore from '../store/authStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserFCMToken } from '../api/database';

 export default function UseToken() {
  const authUser = useAuthStore.getState() ?? {};
    
  if (!authUser) {
    throw new Error('User is not authenticated');
  }
  const uid = authUser.user?.uid;

  const queryClient = useQueryClient();

  const tokenQuery = useQuery({
    queryKey: ['token', uid],
    queryFn: () => getUserFCMToken(uid),
  });


  return { tokenQuery };
}