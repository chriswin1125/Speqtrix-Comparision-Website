import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';
import { api } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { ProductCard } from './ProductCard';
import { 
  ArrowLeft, Scale, ShieldCheck, ShieldAlert, 
  Calendar, Star, ThumbsUp, ThumbsDown, Layers 
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { compareList, addProduct } = useComparison();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    api.getProductById(id)
      .then(res => {
        setProduct(res.product);
        setActiveImage(res.product.image);
        if (res.product.category) {
          api.getProducts({ category: res.product.category, limit: 4 })
            .then(simRes => {
              setSimilarProducts((simRes.products || []).filter(p => p.id !== res.product.id));
            })
            .catch(() => {});
        }
      })
      .catch(err => {
        console.error('Failed to load product:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-28 flex flex-col items-center justify-center text-neutral-400 gap-3">
        <div className="w-6 h-6 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
        <span className="text-xs">Loading specifications...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-28 text-center">
        <h2 className="text-2xl font-bold text-black dark:text-white">Product Not Found</h2>
        <p className="text-sm text-neutral-500 mt-2">The requested specification page could not be located.</p>
        <button
          onClick={() => navigate('/catalog')}
          className="mt-6 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const inCompare = compareList.some(p => p.id === product.id);

  const handleLaunchCompare = () => {
    addProduct(product);
    navigate('/compare');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-14 border-b border-black/[0.08] dark:border-white/[0.08]">
        
        {/* Left: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] p-10 flex items-center justify-center overflow-hidden shadow-subtle">
            <img
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-2xl bg-white dark:bg-neutral-900 border p-2 shrink-0 transition-all ${
                    activeImage === img ? 'border-black dark:border-white ring-2 ring-black/10 dark:ring-white/10' : 'border-black/[0.08] dark:border-white/[0.08]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Comparison Launcher (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black">
                {product.brand}
              </span>
              <span className="text-xs text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-xs text-neutral-500 capitalize font-medium">
                {product.category?.replace('-', ' ')}
              </span>

              {product.verified ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Verified Hardware Spec
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-neutral-500">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                  User-Provided Specification
                </span>
              )}
            </div>

            {/* Title & Model */}
            <h1 className="text-3xl sm:text-5xl font-bold text-black dark:text-white tracking-tight">
              {product.name}
            </h1>
            
            {product.modelNumber && (
              <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1.5">
                Model: {product.modelNumber} {product.series ? `• ${product.series}` : ''}
              </p>
            )}

            {/* Rating & Launch Date */}
            <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
              {product.rating && (
                <div className="flex items-center gap-1 font-semibold text-black dark:text-white">
                  <Star className="w-3.5 h-3.5 fill-black dark:fill-white text-black dark:text-white" />
                  <span>{product.rating} / 5.0</span>
                </div>
              )}
              {product.releaseDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Released: {product.releaseDate}</span>
                </div>
              )}
            </div>

            {/* Price Banner */}
            <div className="mt-6 p-5 rounded-2xl bg-[#f5f5f7] dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Official Price</span>
                <span className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
                  {formatINR(product.price, product.priceINR, product.currency)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Verified Price</span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  INR (₹) Indian Market
                </span>
              </div>
            </div>

            {/* Overview */}
            <p className="mt-5 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {product.overview}
            </p>

            {/* Pros & Cons */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.pros && product.pros.length > 0 && (
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.06] dark:border-white/[0.06]">
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    {product.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-neutral-400 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.cons && product.cons.length > 0 && (
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.06] dark:border-white/[0.06]">
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
                    Trade-offs
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    {product.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-neutral-400 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Button: Add to Comparison Matrix */}
          <div className="mt-8 pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center gap-3">
            <button
              onClick={handleLaunchCompare}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-sm font-semibold shadow-subtle transition-all hover:scale-105"
            >
              <Scale className="w-4 h-4" />
              <span>{inCompare ? 'Open Comparison Engine' : 'Compare This Product Side-by-Side'}</span>
            </button>
            <button
              onClick={() => addProduct(product)}
              disabled={inCompare}
              className="px-5 py-3.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-black dark:text-white text-sm font-semibold transition-all"
            >
              {inCompare ? 'In Comparison List' : 'Add to Slots'}
            </button>
          </div>
        </div>
      </div>

      {/* Full Technical Specifications Sheet */}
      <div className="py-14 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div className="flex items-center gap-2 text-neutral-400 font-semibold text-xs tracking-wider uppercase mb-1">
          <Layers className="w-4 h-4" />
          <span>Full Spec Sheet</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-8">
          Technical Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.specifications && Object.entries(product.specifications).map(([section, specs]) => (
            <div
              key={section}
              className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900 p-6 shadow-subtle"
            >
              <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider pb-3 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                {section}
              </h3>
              <dl className="divide-y divide-black/[0.04] dark:divide-white/[0.04] text-xs sm:text-sm">
                {Object.entries(specs).map(([k, v]) => (
                  <div key={k} className="py-3 flex items-start justify-between gap-4">
                    <dt className="text-neutral-500 font-normal min-w-[140px]">{k}</dt>
                    <dd className="text-black dark:text-white font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Alternatives */}
      {similarProducts.length > 0 && (
        <div className="pt-14">
          <h2 className="text-xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-8">
            Compare With Related {product.category?.replace('-', ' ')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
