import React from 'react';
import { Sparkles } from 'lucide-react';

export const SmartFallbackBanner = ({ query, fallbackMessage, targetCategory }) => {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] mb-6">
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-black dark:text-white flex items-center gap-2">
            Smart Catalog Fallback Active
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
              Alternative Matches
            </span>
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            {fallbackMessage || `We couldn't locate exact factory verification records for "${query}". Showing closely related alternative devices below.`}
          </p>
        </div>
      </div>
    </div>
  );
};
