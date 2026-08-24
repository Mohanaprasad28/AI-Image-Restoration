import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/40 shadow-emerald-500/10',
    error: 'border-rose-500/40 shadow-rose-500/10',
    info: 'border-cyan-500/40 shadow-cyan-500/10',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`glass-panel px-5 py-4 rounded-2xl border ${borders[toast.type || 'info']} shadow-2xl flex items-center gap-3 max-w-md`}>
        {icons[toast.type || 'info']}
        <p className="text-xs font-semibold text-slate-200">{toast.message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
