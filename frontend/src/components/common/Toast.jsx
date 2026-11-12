import React from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useComparison();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100',
    error: 'border-rose-500/30 bg-rose-50/90 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100',
    warning: 'border-amber-500/30 bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100',
    info: 'border-brand-500/30 bg-brand-50/90 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-premium backdrop-blur-md ${borderColors[toastMessage.type] || borderColors.info}`}>
        {icons[toastMessage.type] || icons.info}
        <div className="text-sm font-medium leading-relaxed pr-2">
          {toastMessage.message}
        </div>
      </div>
    </div>
  );
};
