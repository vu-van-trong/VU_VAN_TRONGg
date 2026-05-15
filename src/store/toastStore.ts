import { create } from 'zustand';

type ToastStore = {
  message: string;
  isVisible: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  message: '',
  isVisible: false,
  showToast: (message) => set({ message, isVisible: true }),
  hideToast: () => set({ isVisible: false }),
}));