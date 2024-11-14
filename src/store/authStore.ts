import { User } from 'firebase/auth';
import { onUserStateChange } from '../api/auth';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  authStatus: 'loading' | 'authenticated' | 'unauthenticated' | 'error'; // 세부 상태 추가
  setAuthState: (user: User | null, authStatus: 'loading' | 'authenticated' | 'unauthenticated' | 'error') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authStatus: 'loading',
  setAuthState: (user, authStatus) => set({ user, authStatus }),
}));

// Firebase 상태 변경 리스너 연결
export function initializeAuthListener() {
  onUserStateChange((user: User | null) => {
    if (user) {
      useAuthStore.getState().setAuthState(user, 'authenticated');
    } else {
      useAuthStore.getState().setAuthState(null, 'unauthenticated');
    }
  });
}
