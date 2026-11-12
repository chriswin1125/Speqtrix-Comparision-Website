import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';
import { api } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { SmartFallbackBanner } from './SmartFallbackBanner';
import { 
  Search, X, Clock, Scale, ArrowRight, 
  Check, PlusCircle 
} from 'lucide-react';

const SEARCH_HISTORY_KEY = 'nexus_search_history';

export const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addProduct, compareList } = useComparison();
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [results, setResults] = useState([]);
  const [fallbackData, setFallbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      return saved ? JSON.parse(saved) : ['Samsung Galaxy S25', 'Apple MacBook Pro M4', 'LG OLED G4', 'Sony XM5'];
    } catch {
      return [];
    }
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (isOpen) {
      api.getCategories().then(res => setCategories(res.categories || [])).catch(() => {});
      api.getBrands().then(res => setBrands(res.brands || [])).catch(() => {});
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await api.searchLive(query, selectedCategory, selectedBrand);
        setResults(data.results || []);
        if (data.fallbackTriggered) {
          setFallbackData({
            query: data.query,
            message: data.fallbackMessage,
            targetCategory: data.targetCategory
          });
        } else {
          setFallbackData(null);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, selectedCategory, selectedBrand, isOpen]);

  const saveToHistory = (item) => {
    if (!item || !item.trim()) return;
    const trimmed = item.trim();
    setHistory(prev => {
      const filtered = prev.filter(h => h.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectProduct = (product) => {
    saveToHistory(product.name);
    onClose();
    navigate(`/product/${product.id}`);
  };

  const handleAddToCompare = (e, product) => {
    e.stopPropagation();
    addProduct(product);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.1] dark:border-white/[0.1] shadow-floating overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by category, brand, model, series, or keywords..."
            className="flex-1 bg-transparent text-sm sm:text-base font-normal text-black dark:text-white placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar: Categories & Brands */}
        <div className="px-5 py-3 bg-[#f5f5f7] dark:bg-[#161618] border-b border-black/[0.06] dark:border-white/[0.06] flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            All
          </button>
          {categories.slice(0, 5).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-1.5">
            <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">
              Brand:
            </span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-2 py-1 rounded-lg text-xs bg-white dark:bg-neutral-800 text-black dark:text-white border border-black/[0.08] dark:border-white/[0.08] focus:outline-none"
            >
              <option value="all">All Brands</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Body / Results */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Smart Fallback Notification if active */}
          {fallbackData && (
            <SmartFallbackBanner
              query={fallbackData.query}
              fallbackMessage={fallbackData.message}
              targetCategory={fallbackData.targetCategory}
            />
          )}

          {/* Autocomplete / Suggested chips */}
          {!query && history.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recent Searches
                </span>
                <button
                  onClick={clearHistory}
                  className="text-[11px] text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Clear history
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Match List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                {fallbackData ? 'Suggested Alternatives' : 'Verified Products'} ({results.length})
              </span>
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-neutral-400 gap-2">
                <div className="w-5 h-5 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Searching specifications...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((product) => {
                  const inCompare = compareList.some(p => p.id === product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="group flex items-center justify-between p-3.5 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] hover:border-black dark:hover:border-white hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-contain bg-neutral-50 dark:bg-neutral-800 shrink-0 p-1 border border-black/[0.04] dark:border-white/[0.04]"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase text-neutral-400 tracking-wider">
                              {product.brand}
                            </span>
                            <span className="text-xs text-neutral-300 dark:text-neutral-700">•</span>
                            <span className="text-xs text-neutral-500 capitalize">
                              {product.category.replace('-', ' ')}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-black dark:text-white truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs font-bold text-black dark:text-white mt-0.5">
                            {formatINR(product.price, product.priceINR, product.currency)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => handleAddToCompare(e, product)}
                          disabled={inCompare}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            inCompare
                              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-default'
                              : 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                          }`}
                        >
                          {inCompare ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">In Compare</span>
                            </>
                          ) : (
                            <>
                              <Scale className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Compare</span>
                            </>
                          )}
                        </button>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 px-5 bg-[#f5f5f7] dark:bg-[#161618] border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 font-medium">
          <span>Press ESC or click outside to dismiss</span>
          <span className="font-mono text-[11px]">SPEQTRIX Catalog</span>
        </div>
      </div>
    </div>
  );
};
