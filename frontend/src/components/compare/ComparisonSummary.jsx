import React from 'react';
import { 
  Trophy, BatteryCharging, Monitor, Cpu, IndianRupee, 
  Sparkles, CheckCircle2, ShieldCheck, Scale 
} from 'lucide-react';

export const ComparisonSummary = ({ verdict, productSummaries }) => {
  if (!verdict) return null;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle mb-10">
      
      {/* Header & Verdict */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-1.5 text-neutral-400 font-medium text-xs tracking-wider uppercase mb-1.5">
            <span>Hardware Assessment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Comparison Verdict
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-3xl leading-relaxed">
            {verdict.overallVerdict}
          </p>
        </div>

        {/* Advantage Score Cards */}
        <div className="flex flex-wrap items-center gap-2.5">
          {productSummaries.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.06] dark:border-white/[0.06] min-w-[130px]"
            >
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider truncate">
                {p.brand}
              </div>
              <div className="text-xs sm:text-sm font-bold text-black dark:text-white truncate">
                {p.name.split(' ').slice(0, 3).join(' ')}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  🟢 +{p.advantagesCount}
                </span>
                <span className="text-rose-500 font-medium flex items-center gap-0.5">
                  🔴 -{p.disadvantagesCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Leaders Grid (Display, Battery, Performance, Value) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6">
        
        {/* Best Performance */}
        {verdict.bestPerformance && (
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium text-xs uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Performance</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black dark:text-white tracking-tight">
                {verdict.bestPerformance.productName}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {verdict.bestPerformance.reason}
              </p>
            </div>
          </div>
        )}

        {/* Best Display */}
        {verdict.bestDisplay && (
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium text-xs uppercase tracking-wider mb-2">
              <Monitor className="w-3.5 h-3.5" />
              <span>Display</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black dark:text-white tracking-tight">
                {verdict.bestDisplay.productName}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {verdict.bestDisplay.reason}
              </p>
            </div>
          </div>
        )}

        {/* Best Battery */}
        {verdict.bestBattery && (
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium text-xs uppercase tracking-wider mb-2">
              <BatteryCharging className="w-3.5 h-3.5" />
              <span>Battery</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black dark:text-white tracking-tight">
                {verdict.bestBattery.productName}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {verdict.bestBattery.reason}
              </p>
            </div>
          </div>
        )}

        {/* Best Value */}
        {verdict.bestValue && (
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium text-xs uppercase tracking-wider mb-2">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Value</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black dark:text-white tracking-tight">
                {verdict.bestValue.productName}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {verdict.bestValue.reason}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Main Advantage points per device */}
      {verdict.highlights && verdict.highlights.length > 0 && (
        <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.06]">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
            Key Advantages by Device
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {verdict.highlights.map(h => (
              <div key={h.id} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black dark:text-white font-semibold">{h.name}: </strong>
                  <span className="text-neutral-600 dark:text-neutral-400">{h.keyAdvantage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
