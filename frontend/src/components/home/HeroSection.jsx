import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Scale, ArrowRight, Sparkles, ShieldCheck, 
  CheckCircle, Zap
} from 'lucide-react';
import { api } from '../../services/api';
import { formatINR } from '../../utils/formatters';

export const HeroSection = ({ onOpenSearch }) => {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState('');
  const [quickSuggestions, setQuickSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (quickQuery.trim().length > 1) {
      api.searchLive(quickQuery, '', '', 5)
        .then(res => setQuickSuggestions(res.results || []))
        .catch(() => setQuickSuggestions([]));
    } else {
      setQuickSuggestions([]);
    }
  }, [quickQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      onOpenSearch();
    }
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Apple-style minimalist pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-subtle mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
          <span>Precision Hardware Benchmark Engine</span>
        </div>

        {/* Hero Title with Apple Typography */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black dark:text-white leading-[1.05]">
          Compare Smarter. <br />
          <span className="text-neutral-400 dark:text-neutral-500 font-light">
            Choose Better.
          </span>
        </h1>

        {/* Supporting description */}
        <p className="mt-6 text-base sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Evaluate flagship smartphones, laptops, 4K OLED TVs, inverter ACs, wearables, and consoles side-by-side with dynamic 3-way indicators and empirical hardware benchmarking.
        </p>

        {/* Apple-style Broader Search Bar */}
        <div className="mt-10 max-w-3xl sm:max-w-4xl mx-auto relative">
          <form 
            onSubmit={handleSearchSubmit}
            className={`relative flex items-center bg-white dark:bg-neutral-900 rounded-full border transition-all duration-200 shadow-premium ${
              isFocused 
                ? 'border-black dark:border-white ring-4 ring-black/5 dark:ring-white/5' 
                : 'border-black/[0.1] dark:border-white/[0.1] hover:border-black/20 dark:hover:border-white/20'
            }`}
          >
            <div className="pl-5 text-neutral-400">
              <Search className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </div>
            
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search by category, brand, model number..."
              className="w-full py-4 pl-3.5 pr-28 text-sm sm:text-base font-normal bg-transparent text-black dark:text-white placeholder:text-neutral-400 focus:outline-none"
            />

            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Autocomplete dropdown */}
          {isFocused && quickSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 rounded-2xl border border-black/10 dark:border-white/10 shadow-floating overflow-hidden z-30 text-left divide-y divide-black/5 dark:divide-white/5">
              {quickSuggestions.map(p => (
                <div
                  key={p.id}
                  onMouseDown={() => navigate(`/product/${p.id}`)}
                  className="flex items-center gap-3.5 p-3.5 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-black/5 dark:border-white/5"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase text-neutral-500">
                        {p.brand}
                      </span>
                      <span className="text-[10px] text-neutral-400">•</span>
                      <span className="text-[11px] text-neutral-400 capitalize">{p.category}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-black dark:text-white truncate">
                      {p.name}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-black dark:text-white shrink-0">
                    {formatINR(p.price, p.priceINR, p.currency)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick popular tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500">
            <span className="text-neutral-400 font-medium">Quick search:</span>
            {[
              { label: 'S25 Ultra', id: 'samsung-galaxy-s25-ultra' },
              { label: 'iPhone 16 Pro Max', id: 'apple-iphone-16-pro-max' },
              { label: 'MacBook Pro M4', id: 'apple-macbook-pro-16-m4-max' },
              { label: 'LG OLED G4', id: 'lg-oled-evo-g4-65' },
              { label: 'Daikin 1.5 Ton AC', id: 'daikin-1-5-ton-5-star-inverter-ac' }
            ].map(tag => (
              <button
                key={tag.id}
                onClick={() => navigate(`/product/${tag.id}`)}
                className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-14 pt-10 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle flex items-start gap-3">
            <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-black dark:text-white shrink-0">
              <Scale className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black dark:text-white">Up to 4 Devices</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Compare multiple same-category products simultaneously</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle flex items-start gap-3">
            <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-black dark:text-white shrink-0">
              <Zap className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black dark:text-white">3-Way Indicators</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Dynamic 🟢 ↑ Better, 🔴 ↓ Inferior, ⚪ = Equal</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle flex items-start gap-3">
            <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-black dark:text-white shrink-0">
              <ShieldCheck className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black dark:text-white">Verified Specs</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Zero fabrication and explicit user-provided tagging</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle flex items-start gap-3">
            <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-black dark:text-white shrink-0">
              <CheckCircle className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black dark:text-white">Zero Login Wall</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Instant frictionless comparisons with shareable links</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
