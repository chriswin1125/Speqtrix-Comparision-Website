import React from 'react';
import { ArrowUp, ArrowDown, Equal } from 'lucide-react';

export const SpecRow = ({ specKey, values, highlightDifferences }) => {
  // If highlightDifferences is on, check if all values are identical or all equal
  const isAllEqual = values.every(v => v.value === values[0].value || v.status === 'equal');
  if (highlightDifferences && isAllEqual && values.length > 1) {
    return null;
  }

  return (
    <tr className="border-b border-black/[0.05] dark:border-white/[0.05] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
      {/* Spec Label column (Sticky) */}
      <td className="py-3 sm:py-3.5 px-3 sm:px-6 text-[11px] sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 table-sticky-col bg-white dark:bg-neutral-900 border-r border-black/[0.06] dark:border-white/[0.06] min-w-[120px] sm:min-w-[190px]">
        {specKey}
      </td>

      {/* Values for each compared product */}
      {values.map((item, idx) => {
        let badgeStyle = '';
        let indicatorIcon = null;

        if (item.status === 'better') {
          badgeStyle = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
          indicatorIcon = (
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <ArrowUp className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[2.5]" />
            </span>
          );
        } else if (item.status === 'inferior') {
          badgeStyle = 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20';
          indicatorIcon = (
            <span className="inline-flex items-center gap-1 font-bold text-rose-500">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <ArrowDown className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[2.5]" />
            </span>
          );
        } else if (item.status === 'equal') {
          badgeStyle = 'bg-black/5 dark:bg-white/5 text-neutral-500 border-black/10 dark:border-white/10';
          indicatorIcon = (
            <span className="inline-flex items-center gap-1 font-mono font-medium text-neutral-400">
              <Equal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </span>
          );
        }

        return (
          <td
            key={idx}
            className="py-3 sm:py-3.5 px-3 sm:px-5 text-xs sm:text-sm text-black dark:text-white border-r last:border-r-0 border-black/[0.06] dark:border-white/[0.06] min-w-[160px] sm:min-w-[240px]"
          >
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <span className="font-normal leading-relaxed text-xs sm:text-sm">{item.value}</span>
              {indicatorIcon && (
                <div
                  className={`shrink-0 px-1.5 sm:px-2 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 ${badgeStyle}`}
                  title={item.label}
                >
                  {indicatorIcon}
                </div>
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
};
