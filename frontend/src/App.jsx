import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { SearchModal } from './components/search/SearchModal';
import { HomePage } from './components/home/HomePage';
import { ProductCatalogPage } from './components/products/ProductCatalogPage';
import { ProductDetailPage } from './components/products/ProductDetailPage';
import { ComparisonEngineView } from './components/compare/ComparisonEngineView';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors duration-200">
      
      {/* Global Navbar with broader justified search */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/catalog" element={<ProductCatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/compare" element={<ComparisonEngineView />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <Toast />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

    </div>
  );
}
