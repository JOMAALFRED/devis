'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'info', onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const config = {
    success: { icon: CheckCircle, bg: 'bg-green-500/20 border-green-500/30 text-green-400', iconColor: 'text-green-400' },
    error: { icon: XCircle, bg: 'bg-red-500/20 border-red-500/30 text-red-400', iconColor: 'text-red-400' },
    info: { icon: Info, bg: 'bg-blue-500/20 border-blue-500/30 text-blue-400', iconColor: 'text-blue-400' },
    warning: { icon: AlertTriangle, bg: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400', iconColor: 'text-yellow-400' }
  };

  const Icon = config[type].icon;

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${config[type].bg} animate-fade-in-up`}>
      <Icon size={18} className={config[type].iconColor} />
      <p className="text-sm font-mono">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition">
        <X size={14} />
      </button>
    </div>
  );
}
