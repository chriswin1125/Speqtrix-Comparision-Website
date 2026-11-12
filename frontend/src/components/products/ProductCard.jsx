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
      className="group rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] hover:border-black dark:hover:border-white shadow-subtle hover:shadow-premium transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative aspect-[4/3] bg-[#fbfbfd] dark:bg-[#0a0a0c] p-6 flex items-center justify-center overflow-hidden border-b border-black/[0.04] dark:border-white/[0.04]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.verified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle backdrop-blur-sm">
                Custom
              </span>
            )}
          </div>

          {product.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white border border-black/[0.08] dark:border-white/[0.08] shadow-subtle backdrop-blur-sm">
              <Star className="w-3 h-3 fill-black dark:fill-white text-black dark:text-white" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold uppercase text-neutral-400 tracking-wider text-[10px]">
              {product.brand}
            </span>
            <span className="text-neutral-400 capitalize text-[11px]">
              {product.category?.replace('-', ' ')}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-black dark:text-white line-clamp-1 tracking-tight">
            {product.name}
          </h3>

          {product.modelNumber && (
            <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
              {product.modelNumber}
            </div>
          )}

          {/* Quick Spec Highlights */}
          {product.pros && product.pros.length > 0 && (
            <p className="text-xs text-neutral-500 mt-2.5 line-clamp-2 leading-relaxed">
              {product.pros[0]}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-black/[0.04] dark:border-white/[0.04] mt-2">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-medium">MSRP</span>
          <span className="text-base sm:text-lg font-bold text-black dark:text-white tracking-tight">
            {formatINR(product.price, product.priceINR, product.currency)}
          </span>
        </div>

        <button
          onClick={handleCompareClick}
          disabled={inCompare}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            inCompare
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-default'
              : 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
          }`}
          title={inCompare ? 'Already added' : 'Add to comparison'}
        >
          {inCompare ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>In Compare</span>
            </>
          ) : (
            <>
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
