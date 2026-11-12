import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';
import { api } from '../../services/api';
import { Scale, ArrowRight } from 'lucide-react';

export const TrendingComparisons = () => {
  const navigate = useNavigate();
  const { launchDirectComparison } = useComparison();
  const [comparisons, setComparisons] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    api.getPopularComparisons()
      .then(res => setComparisons(res.comparisons || []))
      .catch(() => {});
  }, []);

  const handleLaunch = async (comp) => {
    setLoadingId(comp.id);
    const success = await launchDirectComparison(comp.productIds);
    setLoadingId(null);
    if (success) {
      navigate('/compare');
    }
  };

  return (
    <section className="py-16 sm:py-20 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-neutral-500 font-medium text-xs tracking-wider uppercase mb-1.5">
              <span>Curated Benchmarks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
              Popular Comparisons
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Most frequently benchmarked hardware pairings with side-by-side empirical advantage analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {comparisons.map((comp) => (
            <div
              key={comp.id}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] hover:border-black dark:hover:border-white shadow-subtle hover:shadow-premium transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white">
                    {comp.tag}
                  </span>
                  <span className="text-xs text-neutral-400 capitalize">
                    {comp.category.replace('-', ' ')}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors tracking-tight">
                  {comp.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                  Comparing {comp.productIds.length} flagship devices simultaneously with category scoring rules.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  {comp.productIds.length}-Way Matrix
                </span>
                <button
                  onClick={() => handleLaunch(comp)}
                  disabled={loadingId === comp.id}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-xs font-semibold shadow-subtle transition-all hover:scale-105"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{loadingId === comp.id ? 'Loading...' : 'Launch Compare'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
