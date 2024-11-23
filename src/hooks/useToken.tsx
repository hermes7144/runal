import React from 'react';
import useAuthStore from '../store/authStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserFCMToken } from '../api/database';

 export default function UseToken() {
  const uid = useAuthStore.getState().user?.uid ?? '';
  if (!uid) {
    throw new Error('User is not authenticated');
  }
  const queryClient = useQueryClient();

  const tokenQuery = useQuery({
    queryKey: ['token', uid],
    queryFn: () => getUserFCMToken(uid),
  });

  return { tokenQuery };
}