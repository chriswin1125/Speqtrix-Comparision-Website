import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';
import { formatINR } from '../../utils/formatters';
import { Scale, Check, Star, ShieldCheck } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { compareList, addProduct } = useComparison();

  const inCompare = compareList.some(p => p.id === product.id);

  const handleCompareClick = (e) => {
    e.stopPropagation();
    addProduct(product);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group rounded-2xl sm:rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] hover:border-black dark:hover:border-white shadow-subtle hover:shadow-premium transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative aspect-[4/3] bg-[#fbfbfd] dark:bg-[#0a0a0c] p-3.5 sm:p-6 flex items-center justify-center overflow-hidden border-b border-black/[0.04] dark:border-white/[0.04]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1">
            {product.verified ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle backdrop-blur-sm">
                <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle backdrop-blur-sm">
                Custom
              </span>
            )}
          </div>

          {product.rating && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white border border-black/[0.08] dark:border-white/[0.08] shadow-subtle backdrop-blur-sm">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black dark:fill-white text-black dark:text-white" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-5">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold uppercase text-neutral-400 tracking-wider text-[9px] sm:text-[10px]">
              {product.brand}
            </span>
            <span className="text-neutral-400 capitalize text-[10px] sm:text-[11px]">
              {product.category?.replace('-', ' ')}
            </span>
          </div>

          <h3 className="text-xs sm:text-base font-bold text-black dark:text-white line-clamp-1 tracking-tight">
            {product.name}
          </h3>

          {product.modelNumber && (
            <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-0.5 truncate">
              {product.modelNumber}
            </div>
          )}

          {/* Quick Spec Highlights */}
          {product.pros && product.pros.length > 0 && (
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
              {product.pros[0]}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3.5 sm:p-5 pt-0 flex items-center justify-between border-t border-black/[0.04] dark:border-white/[0.04] mt-1 sm:mt-2">
        <div>
          <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider block font-medium">MSRP</span>
          <span className="text-sm sm:text-lg font-bold text-black dark:text-white tracking-tight">
            {formatINR(product.price, product.priceINR, product.currency)}
          </span>
        </div>

        <button
          onClick={handleCompareClick}
          disabled={inCompare}
          className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
            inCompare
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-default'
              : 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
          }`}
          title={inCompare ? 'Already added' : 'Add to comparison'}
        >
          {inCompare ? (
            <>
              <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>In Compare</span>
            </>
          ) : (
            <>
              <Scale className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>Compare</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
