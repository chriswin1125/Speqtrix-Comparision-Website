import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import { ProductCard } from './ProductCard';
import { Search, ArrowUpDown, RotateCcw } from 'lucide-react';

export const ProductCatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [brand, setBrand] = useState(searchParams.get('brand') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState('popularity');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
    const b = searchParams.get('brand');
    if (b) setBrand(b);
    const s = searchParams.get('search');
    if (s) setSearch(s);
  }, [searchParams]);

  useEffect(() => {
    api.getCategories().then(res => setCategories(res.categories || [])).catch(() => {});
    api.getBrands(category === 'all' ? '' : category).then(res => setBrands(res.brands || [])).catch(() => {});
  }, [category]);

  useEffect(() => {
    setIsLoading(true);
    const params = {
      category: category === 'all' ? '' : category,
      brand: brand === 'all' ? '' : brand,
      search,
      sort,
      minPrice,
      maxPrice,
      limit: 50
    };

    api.getProducts(params)
      .then(res => {
        setProducts(res.products || []);
        setTotalCount(res.total || 0);
      })
      .catch(err => {
        console.error('Failed to fetch catalog:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, brand, search, sort, minPrice, maxPrice]);

  const resetFilters = () => {
    setCategory('all');
    setBrand('all');
    setSearch('');
    setSort('popularity');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-neutral-400 font-medium text-[11px] sm:text-xs tracking-wider uppercase mb-1">
            <span>Catalog Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
            All Products
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Showing {totalCount} verified hardware models ready for comparison.
          </p>
        </div>
      </div>

      {/* Filter & Sort Controls Grid */}
      <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] shadow-subtle mb-6 sm:mb-8 space-y-3.5 sm:space-y-4">
        
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row items-center gap-2.5 sm:gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keywords, exact model, or series..."
              className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] border border-black/[0.04] dark:border-white/[0.04] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] border border-black/[0.04] dark:border-white/[0.04] text-neutral-600 dark:text-neutral-300 flex-1 sm:flex-initial">
              <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold text-[11px] sm:text-xs">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent font-medium text-black dark:text-white focus:outline-none text-[11px] sm:text-xs w-full"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {(category !== 'all' || brand !== 'all' || search || minPrice || maxPrice) && (
              <button
                onClick={resetFilters}
                className="p-2 sm:p-2.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Category Chips with Momentum Scrolling */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar touch-scroll pb-1 text-xs -mx-1 px-1">
          <button
            onClick={() => setCategory('all')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-full font-semibold shrink-0 text-[11px] sm:text-xs transition-all ${
              category === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-subtle'
                : 'bg-[#f5f5f7] dark:bg-[#1c1c1e] text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full font-medium shrink-0 text-[11px] sm:text-xs transition-all ${
                category === cat.id
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-subtle font-semibold'
                  : 'bg-[#f5f5f7] dark:bg-[#1c1c1e] text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Row 3: Brand & Price Filters */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.04] text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400 font-semibold text-[10px] uppercase">Brand:</span>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] text-black dark:text-white font-medium focus:outline-none text-[11px] sm:text-xs"
            >
              <option value="all">All Brands</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400 font-semibold text-[10px] uppercase">Price (₹):</span>
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-16 sm:w-20 px-2.5 sm:px-3 py-1 rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] text-black dark:text-white focus:outline-none text-[11px] sm:text-xs"
            />
            <span className="text-neutral-400">-</span>
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-16 sm:w-20 px-2.5 sm:px-3 py-1 rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] text-black dark:text-white focus:outline-none text-[11px] sm:text-xs"
            />
          </div>
        </div>

      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 rounded-2xl sm:rounded-3xl bg-black/[0.04] dark:bg-white/[0.04] animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-base font-semibold text-black dark:text-white">
            No products match the selected criteria.
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Try adjusting filters or submit a custom product specification.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
