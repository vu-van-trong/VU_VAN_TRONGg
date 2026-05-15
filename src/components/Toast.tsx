import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useToastStore } from '@/src/store/toastStore';

export default function Toast() {
  const { message, isVisible, hideToast } = useToastStore();

  useEffect(() => {
    if (!isVisible) return;

    const timer = window.setTimeout(() => {
      hideToast();
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [hideToast, isVisible, message]);

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-24 z-[120] flex items-center gap-2 rounded-full bg-gray-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 transition-all duration-200">
      <CheckCircle size={18} className="text-green-400" />
      <span>{message}</span>
    </div>
  );
}