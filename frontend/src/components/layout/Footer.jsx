import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export const Footer = () => {
  const [dbInfo, setDbInfo] = useState({ storageEngine: 'Connecting...', mongoConnected: false });

  useEffect(() => {
    api.getHealth()
      .then(res => {
        if (res.db) setDbInfo(res.db);
      })
      .catch(() => {
        setDbInfo({ storageEngine: 'Embedded JSON Store', mongoConnected: false });
      });
  }, []);

  return (
    <footer className="w-full bg-[#f5f5f7] dark:bg-[#000000] border-t border-black/[0.08] dark:border-white/[0.08] text-neutral-500 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-black dark:text-white tracking-tight">
                COMPARE<span className="font-light text-neutral-400">LY</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              The precision consumer electronics benchmarking and multi-device comparison engine. Empirical accuracy with zero marketing fluff.
            </p>
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Factory Verified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300">
                <Database className="w-3.5 h-3.5 text-neutral-500" />
                <span>DB: {dbInfo.storageEngine}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-500">
              <li>
                <Link to="/catalog?category=smartphones" className="hover:text-black dark:hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=laptops" className="hover:text-black dark:hover:text-white transition-colors">
                  Laptops & Ultrabooks
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=smart-tvs" className="hover:text-black dark:hover:text-white transition-colors">
                  Smart TVs & OLED
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=air-conditioners" className="hover:text-black dark:hover:text-white transition-colors">
                  Air Conditioners
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=smartwatches" className="hover:text-black dark:hover:text-white transition-colors">
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=headphones" className="hover:text-black dark:hover:text-white transition-colors">
                  Headphones & ANC
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Brands */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white mb-4">
              Manufacturers
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-500">
              <li>
                <Link to="/catalog?brand=Apple" className="hover:text-black dark:hover:text-white transition-colors">
                  Apple
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Samsung" className="hover:text-black dark:hover:text-white transition-colors">
                  Samsung
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Sony" className="hover:text-black dark:hover:text-white transition-colors">
                  Sony
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=LG" className="hover:text-black dark:hover:text-white transition-colors">
                  LG Electronics
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Dell" className="hover:text-black dark:hover:text-white transition-colors">
                  Dell
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Daikin" className="hover:text-black dark:hover:text-white transition-colors">
                  Daikin
                </Link>
              </li>
            </ul>
          </div>

          {/* Comparison Standards */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white mb-4">
              Evaluation Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-500">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                <span>3-Way Indicators (🟢 / 🔴 / ⚪)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                <span>4-Device Simultaneous Matrix</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                <span>Strict Category Homogeneity</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                <span>Custom Device Benchmarking</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            © {new Date().getFullYear()} COMPARELY. Designed with Apple minimalist design standards.
          </p>
          <div className="flex items-center gap-6">
            <span>Precision Data</span>
            <span>Zero Hallucinations</span>
            <span>No Account Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
