import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { 
  Smartphone, Laptop, Tv, Wind, Watch, Headphones, 
  Gamepad2, Monitor, Refrigerator, Sparkles, Camera, 
  Wifi, Tablet, Flame, ArrowRight, Layers
} from 'lucide-react';

const ICON_MAP = {
  Smartphone,
  Laptop,
  Tv,
  Wind,
  Watch,
  Headphones,
  Gamepad2,
  Monitor,
  Refrigerator,
  Sparkles,
  Camera,
  Wifi,
  Tablet,
  Flame
};

export const CategoryGrid = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.getCategories().then(res => setCategories(res.categories || [])).catch(() => {});
  }, []);

  return (
    <section className="py-16 sm:py-20 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-neutral-500 font-medium text-xs tracking-wider uppercase mb-1.5">
              <span>Hardware Categories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
              Explore by Category
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Scalable benchmark categories calibrated with domain-specific evaluation metrics.
            </p>
          </div>

          <button
            onClick={() => navigate('/catalog')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-neutral-500 transition-colors"
          >
            <span>All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Smartphone;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/catalog?category=${cat.id}`)}
                className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] hover:border-black dark:hover:border-white shadow-subtle hover:shadow-premium transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white flex items-center justify-center transition-colors mb-4">
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="text-sm font-bold text-black dark:text-white tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                  <span>{cat.productCount} models</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-black dark:text-white" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
