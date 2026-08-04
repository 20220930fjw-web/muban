import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] bg-black text-white font-jakarta text-xs px-4 py-3 rounded-md flex items-center gap-2 shadow-lg toast-enter">
      <Check size={16} className="text-emerald-400" />
      <span>{message}</span>
    </div>
  );
}
