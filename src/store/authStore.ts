import create from 'zustand';
import { User } from 'firebase/auth';
import { onUserStateChange } from '../api/auth';

interface AuthState {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthLoading: (isLoading: boolean) => void;
}

// zustand 스토어
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthLoading: true,
  setUser: (user) => set({ user }),
  setIsAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),
}));

// Firebase 상태 변경 리스너 연결
export function initializeAuthListener() {
  onUserStateChange((user: User | null) => {
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setIsAuthLoading(false);
  });
}
