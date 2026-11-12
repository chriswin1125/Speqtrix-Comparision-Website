import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';
import { SpecRow } from './SpecRow';
import { ComparisonSummary } from './ComparisonSummary';
import { AddProductModal } from './AddProductModal';
import { formatINR } from '../../utils/formatters';
import { 
  Scale, Plus, X, Share2, Trash2, ChevronDown, ChevronUp, Lock,
  ArrowLeft, ArrowRight, Eye, RefreshCw
} from 'lucide-react';

export const ComparisonEngineView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    compareList, 
    comparisonData,
    isComparing,
    removeProduct, 
    swapProducts, 
    clearComparison, 
    activeCategory, 
    launchDirectComparison,
    showToast 
  } = useComparison();

  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [targetSlotIndex, setTargetSlotIndex] = useState(null);

  // Sync URL query params with compareList smoothly without layout shifts
  useEffect(() => {
    const urlIds = searchParams.get('ids');
    if (urlIds) {
      const idsArr = urlIds.split(',').filter(Boolean);
      const currentIds = compareList.map(p => p.id).join(',');
      if (currentIds !== urlIds) {
        launchDirectComparison(idsArr);
      }
    } else if (compareList.length >= 2) {
      const ids = compareList.map(p => p.id).join(',');
      setSearchParams({ ids }, { replace: true });
    }
  }, []);

  // Update query params when compareList changes without cycle
  useEffect(() => {
    if (compareList.length >= 2) {
      const ids = compareList.map(p => p.id).join(',');
      if (searchParams.get('ids') !== ids) {
        setSearchParams({ ids }, { replace: true });
      }
    } else if (searchParams.get('ids')) {
      setSearchParams({}, { replace: true });
    }
  }, [compareList]);

  const toggleSection = (sectionName) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        showToast('Comparison link copied to clipboard!', 'success');
      })
      .catch(() => {
        showToast('Could not copy link.', 'error');
      });
  };

  const openSlotSelector = (slotIndex = null) => {
    setTargetSlotIndex(slotIndex);
    setIsAddModalOpen(true);
  };

  // If less than 2 products in comparison
  if (compareList.length < 2) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center animate-in fade-in duration-150">
        <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 text-black dark:text-white flex items-center justify-center mx-auto mb-6">
          <Scale className="w-8 h-8 stroke-[1.8]" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
          Comparison Matrix
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 mt-2 max-w-lg mx-auto">
          {compareList.length === 1 
            ? `1 product selected (${compareList[0].name}). Add at least 1 more ${compareList[0].category.replace('-', ' ')} to generate the empirical comparison matrix.` 
            : 'Select at least two products of the same category to benchmark their hardware, performance, and features side by side.'}
        </p>

        {compareList.length === 1 && (
          <div className="mt-8 max-w-md mx-auto p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between shadow-subtle">
            <div className="flex items-center gap-3">
              <img
                src={compareList[0].image}
                alt={compareList[0].name}
                className="w-12 h-12 rounded-xl object-contain bg-neutral-50 dark:bg-neutral-800 p-1"
              />
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Slot 1 • {compareList[0].category}
                </span>
                <h4 className="text-sm font-semibold text-black dark:text-white truncate max-w-[200px]">
                  {compareList[0].name}
                </h4>
              </div>
            </div>
            <button
              onClick={() => removeProduct(compareList[0].id)}
              className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => openSlotSelector(compareList.length)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-sm font-semibold shadow-subtle transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Compatible Product</span>
          </button>
          <button
            onClick={() => navigate('/catalog')}
            className="px-5 py-3 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] hover:border-black dark:hover:border-white text-black dark:text-white text-sm font-semibold transition-all"
          >
            Browse Catalog
          </button>
        </div>

        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          targetSlotIndex={targetSlotIndex}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-150">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-neutral-500 font-medium text-[11px] sm:text-xs tracking-wider uppercase mb-1">
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Category Locked: {activeCategory?.replace('-', ' ').toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
            Comparison Matrix
          </h1>
          <p className="text-[11px] sm:text-sm text-neutral-500 mt-0.5">
            Dynamic indicators: 🟢 Superior &nbsp;•&nbsp; 🔴 Inferior &nbsp;•&nbsp; ⚪ Equal
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setHighlightDifferences(!highlightDifferences)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border transition-all ${
              highlightDifferences
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                : 'bg-white dark:bg-neutral-900 border-black/[0.1] dark:border-white/[0.1] text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Differences Only</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-white dark:bg-neutral-900 border border-black/[0.1] dark:border-white/[0.1] text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition-all shadow-subtle"
            title="Copy shareable link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>

          <button
            onClick={clearComparison}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-white dark:bg-neutral-900 border border-black/[0.1] dark:border-white/[0.1] text-neutral-500 hover:text-black dark:hover:text-white transition-all"
            title="Clear all comparison slots"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Comparison Summary & Verdict Box */}
      {comparisonData && (
        <ComparisonSummary
          verdict={comparisonData.verdict}
          productSummaries={comparisonData.productSummaries}
        />
      )}

      {/* Comparison Table Container */}
      <div className="rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900 shadow-floating overflow-hidden">
        
        {/* Mobile Horizontal Scroll Indicator Hint */}
        <div className="sm:hidden px-4 py-2 bg-neutral-100 dark:bg-neutral-800/80 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Swipe table horizontally to compare
          </span>
          <span className="text-[10px] tracking-wider uppercase text-neutral-400">Scroll →</span>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto touch-scroll">
          <table className="w-full text-left border-collapse">
            
            {/* Table Header: Sticky Product Cards */}
            <thead>
              <tr className="border-b border-black/[0.08] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-[#121214]">
                
                {/* Column 0: Specification Label */}
                <th className="p-3.5 sm:p-6 table-sticky-col bg-[#f5f5f7] dark:bg-[#121214] border-r border-black/[0.08] dark:border-white/[0.08] min-w-[125px] sm:min-w-[190px] align-top">
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-2">
                    Specifications
                  </div>
                  <div className="text-sm sm:text-base font-bold text-black dark:text-white tracking-tight">
                    {compareList.length} Active Slots
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1 leading-snug hidden sm:block">
                    Compare up to 4 models simultaneously.
                  </p>
                </th>

                {/* Compared Products Slots */}
                {compareList.map((product, idx) => (
                  <th
                    key={product.id}
                    className="p-3.5 sm:p-6 border-r last:border-r-0 border-black/[0.08] dark:border-white/[0.08] min-w-[160px] sm:min-w-[240px] align-top bg-white dark:bg-neutral-900"
                  >
                    <div className="flex flex-col justify-between h-full">
                      
                      {/* Top Slot Controls: Slot number, swap arrows, remove */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          Slot {idx + 1}
                        </span>

                        <div className="flex items-center gap-1">
                          {/* Swap left */}
                          {idx > 0 && (
                            <button
                              onClick={() => swapProducts(idx, idx - 1)}
                              className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Swap left"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {/* Swap right */}
                          {idx < compareList.length - 1 && (
                            <button
                              onClick={() => swapProducts(idx, idx + 1)}
                              className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Swap right"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {/* Remove */}
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Product Visual & Identity */}
                      <div>
                        <div className="w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-3 rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-1.5 sm:p-2 border border-black/[0.04] dark:border-white/[0.04]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] sm:text-xs font-bold uppercase text-neutral-500 tracking-wider">
                            {product.brand}
                          </span>
                          {product.verified ? (
                            <span className="inline-flex items-center text-[9px] sm:text-[10px] text-neutral-400 font-medium" title="Verified specs">
                              • Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-[9px] sm:text-[10px] text-neutral-400 font-medium" title="Custom specs">
                              • Custom
                            </span>
                          )}
                        </div>

                        <h3 className="text-xs sm:text-base font-bold text-black dark:text-white leading-snug tracking-tight line-clamp-2">
                          {product.name}
                        </h3>

                        {product.modelNumber && (
                          <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-0.5 truncate">
                            {product.modelNumber}
                          </div>
                        )}

                        <div className="mt-1.5 sm:mt-2 text-sm sm:text-lg font-bold text-black dark:text-white">
                          {formatINR(product.price, product.priceINR, product.currency)}
                        </div>
                      </div>

                      {/* Change / Replace button */}
                      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[10px] sm:text-[11px]">
                        <button
                          onClick={() => openSlotSelector(idx)}
                          className="font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Replace</span>
                        </button>
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          Details
                        </button>
                      </div>

                    </div>
                  </th>
                ))}

                {/* Empty Slot Button if less than 4 */}
                {compareList.length < 4 && (
                  <th className="p-3.5 sm:p-6 border-r last:border-r-0 border-black/[0.08] dark:border-white/[0.08] min-w-[140px] sm:min-w-[220px] align-middle bg-neutral-50/50 dark:bg-neutral-900/50">
                    <div 
                      onClick={() => openSlotSelector(compareList.length)}
                      className="border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer group transition-all"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black text-neutral-500 flex items-center justify-center transition-colors mb-1.5 sm:mb-2">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-black dark:text-white">
                        Add Slot {compareList.length + 1}
                      </span>
                      <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 sm:mt-1 hidden sm:block">
                        Select another {activeCategory?.replace('-', ' ')}
                      </p>
                    </div>
                  </th>
                )}

              </tr>
            </thead>

            {/* Table Body: Expandable Specification Sections */}
            <tbody>
              {comparisonData?.sections?.map((section) => {
                const isCollapsed = collapsedSections[section.sectionName];
                return (
                  <React.Fragment key={section.sectionName}>
                    {/* Section Header Row */}
                    <tr 
                      onClick={() => toggleSection(section.sectionName)}
                      className="bg-[#f5f5f7] dark:bg-[#161618] cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors border-y border-black/[0.06] dark:border-white/[0.06]"
                    >
                      <td 
                        colSpan={compareList.length + (compareList.length < 4 ? 2 : 1)}
                        className="py-3 px-5 sm:px-6 text-xs font-bold uppercase tracking-wider text-black dark:text-white"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                            {section.sectionName}
                          </span>
                          <span className="text-neutral-400 text-xs">
                            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Specification Rows */}
                    {!isCollapsed && section.rows.map((row) => (
                      <SpecRow
                        key={row.specKey}
                        specKey={row.specKey}
                        values={row.values}
                        highlightDifferences={highlightDifferences}
                      />
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

      {/* Add Product Modal for extra slots */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        targetSlotIndex={targetSlotIndex}
      />
    </div>
  );
};
