import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';
import { History, ArrowRight } from 'lucide-react';

export const RecentlyCompared = () => {
  const navigate = useNavigate();
  const { recentHistory, launchDirectComparison } = useComparison();

  if (!recentHistory || recentHistory.length === 0) return null;

  const handleResume = async (item) => {
    const ids = item.products.map(p => p.id);
    const success = await launchDirectComparison(ids);
    if (success) {
      navigate('/compare');
    }
  };

  return (
    <section className="py-14 sm:py-18 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2 text-neutral-500 font-medium text-xs tracking-wider uppercase mb-1.5">
          <History className="w-3.5 h-3.5" />
          <span>Session Memory</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-black dark:text-white mb-6 tracking-tight">
          Recently Compared
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleResume(item)}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] hover:border-black dark:hover:border-white shadow-subtle hover:shadow-premium transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center -space-x-2 mb-3.5 overflow-hidden">
                  {item.products.map(p => (
                    <img
                      key={p.id}
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover bg-neutral-100 dark:bg-neutral-800"
                    />
                  ))}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-black dark:text-white line-clamp-2 tracking-tight">
                  {item.products.map(p => p.name).join(' vs ')}
                </h4>
                
                <span className="text-[11px] text-neutral-400 capitalize mt-1 block">
                  Category: {item.category.replace('-', ' ')}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 group-hover:text-black dark:group-hover:text-white font-medium transition-colors">
                <span>Resume Faceoff</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
