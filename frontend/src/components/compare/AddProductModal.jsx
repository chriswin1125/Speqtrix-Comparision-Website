import React, { useState, useEffect } from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { api } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { Search, X, Lock, Check, Plus, Scale } from 'lucide-react';

export const AddProductModal = ({ isOpen, onClose, targetSlotIndex = null }) => {
  const { compareList, addProduct, replaceProductAt, activeCategory } = useComparison();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    const categoryParam = activeCategory || '';
    api.getProducts({ category: categoryParam, search: query, limit: 20 })
      .then(res => {
        setProducts(res.products || []);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, query, activeCategory]);

  const handleSelect = (product) => {
    if (targetSlotIndex !== null && targetSlotIndex < compareList.length) {
      replaceProductAt(targetSlotIndex, product);
    } else {
      addProduct(product);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.1] dark:border-white/[0.1] shadow-floating overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-black dark:text-white flex items-center gap-2 tracking-tight">
              <Scale className="w-4 h-4" />
              <span>Select Product for Comparison</span>
            </h3>
            {activeCategory && (
              <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-500 font-medium">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Strict Category Filter: <strong>{activeCategory.replace('-', ' ').toUpperCase()}</strong></span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search within Category */}
        <div className="p-4 bg-[#f5f5f7] dark:bg-[#161618] border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${activeCategory ? activeCategory.replace('-', ' ') : 'all'} models, brands, series...`}
              className="w-full pl-11 pr-4 py-2 text-sm rounded-full bg-white dark:bg-neutral-800 border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            />
          </div>
        </div>

        {/* Product Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {isLoading ? (
            <div className="py-12 flex justify-center items-center text-neutral-400 text-xs">
              <div className="w-5 h-5 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin mr-2" />
              Loading compatible models...
            </div>
          ) : products.length > 0 ? (
            products.map((product) => {
              const isAlreadyAdded = compareList.some(p => p.id === product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => !isAlreadyAdded && handleSelect(product)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    isAlreadyAdded
                      ? 'border-black/[0.04] dark:border-white/[0.04] opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-950'
                      : 'border-black/[0.06] dark:border-white/[0.06] hover:border-black dark:hover:border-white hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-contain bg-neutral-50 dark:bg-neutral-800 shrink-0 p-1 border border-black/[0.04] dark:border-white/[0.04]"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                          {product.brand}
                        </span>
                        {product.modelNumber && (
                          <span className="text-[10px] font-mono text-neutral-400">
                            {product.modelNumber}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-black dark:text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-black dark:text-white mt-0.5">
                        {formatINR(product.price, product.priceINR, product.currency)}
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={isAlreadyAdded}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 ${
                      isAlreadyAdded
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                        : 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                    }`}
                  >
                    {isAlreadyAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-neutral-400 text-xs">
              No matching products found in this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
