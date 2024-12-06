import { User } from 'firebase/auth';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  setAuthLoading: (isAuthLoading: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthLoading: true,
  setUser: (user) => set({ user, isAuthLoading: false }),
  logout: () => set({ user: null, isAuthLoading: false }),
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
}));

export default useAuthStore;
