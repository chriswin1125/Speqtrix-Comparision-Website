import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useComparison } from '../../context/ComparisonContext';
import { 
  Sun, Moon, Search, Scale, 
  Menu, X
} from 'lucide-react';

export const Navbar = ({ onOpenSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const { compareList } = useComparison();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-8">
          
          {/* Left: Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group focus:outline-none">
            <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform duration-200">
              <Scale className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-black dark:text-white">
                SPEQ<span className="font-light text-neutral-400 dark:text-neutral-500">TRIX</span>
              </span>
            </div>
          </Link>

          {/* Center: Broader Prominent Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-[#f5f5f7] dark:bg-[#161618] hover:bg-white dark:hover:bg-[#1c1c1e] text-neutral-500 dark:text-neutral-400 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white transition-all shadow-subtle group"
              title="Search specifications, brands, models (Ctrl+K)"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span className="text-xs sm:text-sm font-normal truncate">
                  Search smartphones, laptops, TVs, ACs, brands, models...
                </span>
              </div>
              <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-neutral-400 bg-black/5 dark:bg-white/5 rounded-full">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Navigation Links & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              <Link
                to="/catalog"
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 ${
                  isActive('/catalog')
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                Explore Products
              </Link>

              <Link
                to="/compare"
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 ${
                  isActive('/compare')
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                Comparison Matrix
              </Link>
            </nav>

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              title="Search products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Constant Non-Clickable Compare Status Pill */}
            <div 
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 text-xs font-semibold cursor-default select-none shadow-subtle"
              title="Current items in comparison matrix"
            >
              <Scale className="w-3.5 h-3.5 text-neutral-400" />
              <span>Compare ({compareList.length})</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all shadow-subtle"
              aria-label="Toggle light/dark theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-neutral-200" /> : <Moon className="w-4 h-4 text-neutral-800" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-black/[0.08] dark:border-white/[0.08] space-y-2">
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
            >
              Explore Products
            </Link>
            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
            >
              <span>Comparison Matrix</span>
              <span className="px-2 py-0.5 text-xs font-semibold text-neutral-500">
                ({compareList.length})
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
