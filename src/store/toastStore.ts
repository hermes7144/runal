import { create } from 'zustand';

interface ToastStore {
  message: string;
  showToast: boolean;
  setToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message:'',
  showToast:false,
  setToast: (message: string) => set({message, showToast:true}),
  hideToast: () => set({showToast: false})
}))
