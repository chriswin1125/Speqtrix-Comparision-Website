import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowRight } from 'lucide-react';

export const BrandShowcase = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api.getBrands().then(res => setBrands(res.brands || [])).catch(() => {});
  }, []);

  const BRAND_TAGLINES = {
    'Apple': 'M4 Silicon, Retina XDR, iOS Ecosystem',
    'Samsung': 'Dynamic AMOLED 2X, QD-OLED, Galaxy AI',
    'Sony': 'Exmor Full-Frame, PlayStation Pro, LDAC ANC',
    'LG': 'OLED evo MLA, AI DUAL Inverter Cooling',
    'Google': 'Tensor Computational AI, Super Actua',
    'Dell': 'XPS InfinityEdge, Precision Workstations',
    'Asus': 'ROG Nebula 240Hz, Quad-Band Wi-Fi 6E',
    'OnePlus': '100W SuperVOOC, 6000mAh Glacier Battery',
    'Lenovo': 'ThinkPad Carbon Fiber, Business Mobility',
    'Daikin': 'Japanese Neo Swing 5.2 ISEER Inverter',
    'Microsoft': '12 TFLOPs Xbox Velocity Architecture'
  };

  return (
    <section className="py-16 sm:py-20 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-neutral-500 font-medium text-xs tracking-wider uppercase mb-1.5">
              <span>Brand Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
              Top Tier Manufacturers
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Cross-benchmark hardware specifications across world-class innovators and domestic leaders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              onClick={() => navigate(`/catalog?brand=${brand}`)}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] hover:border-black dark:hover:border-white shadow-subtle hover:shadow-premium transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-base font-bold text-black dark:text-white tracking-tight">
                  {brand}
                </span>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-snug">
                  {BRAND_TAGLINES[brand] || 'Verified consumer electronics line'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 group-hover:text-black dark:group-hover:text-white font-medium transition-colors">
                <span>View Models</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
