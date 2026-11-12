import React, { useState, useEffect } from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { api } from '../../services/api';
import { 
  X, PlusCircle, Plus, CheckCircle2, ShieldAlert
} from 'lucide-react';

export const AddCustomProductModal = ({ isOpen, onClose }) => {
  const { addProduct, activeCategory } = useComparison();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('smartphones');
  const [modelNumber, setModelNumber] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [overview, setOverview] = useState('');
  
  const [specList, setSpecList] = useState([
    { section: 'Performance', key: 'RAM', value: '16 GB' },
    { section: 'Performance', key: 'Internal Storage', value: '512 GB' },
    { section: 'Display', key: 'Display Size', value: '6.7 inches' },
    { section: 'Display', key: 'Refresh Rate', value: '120 Hz' },
    { section: 'Battery', key: 'Battery Capacity', value: '5000 mAh' },
    { section: 'General', key: 'Weight', value: '198 g' }
  ]);

  useEffect(() => {
    if (isOpen) {
      api.getCategories().then(res => {
        setCategories(res.categories || []);
        if (activeCategory) {
          setCategory(activeCategory);
        }
      }).catch(() => {});
    }
  }, [isOpen, activeCategory]);

  const handleAddSpecRow = () => {
    setSpecList(prev => [...prev, { section: 'General', key: '', value: '' }]);
  };

  const handleRemoveSpecRow = (index) => {
    setSpecList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, field, val) => {
    setSpecList(prev => {
      const next = [...prev];
      next[index][field] = val;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const specifications = {};
      specList.forEach(item => {
        if (item.key.trim() && item.value.trim()) {
          const sec = item.section.trim() || 'General';
          if (!specifications[sec]) specifications[sec] = {};
          specifications[sec][item.key.trim()] = item.value.trim();
        }
      });

      const payload = {
        name: name.trim(),
        brand: brand.trim() || 'Custom Manufacturer',
        category,
        modelNumber: modelNumber.trim() || 'USER-SPEC-01',
        price: Number(price) || 0,
        currency: 'INR',
        priceINR: Number(price) || 0,
        image: image.trim() || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        overview: overview.trim() || 'Custom device submitted by user for hardware comparison.',
        specifications,
        pros: ['User-defined custom specifications'],
        cons: ['User-entered specifications (not verified by manufacturer)'],
        isUserAdded: true,
        verified: false,
        dataSource: 'User-Provided Specifications'
      };

      const res = await api.createCustomProduct(payload);
      if (res.product) {
        addProduct(res.product);
        onClose();
      }
    } catch (err) {
      alert(`Could not create custom product: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.1] dark:border-white/[0.1] shadow-floating overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">
                Add Custom Product
              </h3>
              <p className="text-xs text-neutral-500">
                Input your device specifications to benchmark against any verified product
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Transparency Disclaimer */}
          <div className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] flex items-start gap-3 text-xs text-neutral-600 dark:text-neutral-300">
            <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-black dark:text-white">Data Integrity Notice: </span>
              This device will be explicitly labeled with a
              <span className="font-mono bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded mx-1 text-black dark:text-white">
                User-Provided Specification
              </span>
              badge to distinguish it from factory verified products.
            </div>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pixel 10 Pro Concept"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Google / Custom"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={Boolean(activeCategory)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white focus:outline-none disabled:opacity-60"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Model Number
              </label>
              <input
                type="text"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                placeholder="e.g. CPH-2025"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Price (₹ INR)
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 79999"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Product Overview
            </label>
            <textarea
              rows={2}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Short description or notes about this custom configuration..."
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            />
          </div>

          {/* Dynamic Specifications Editor */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white">
                  Technical Specifications
                </h4>
                <p className="text-xs text-neutral-400">
                  Include metrics like RAM, Storage, Battery, Refresh rate
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {specList.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec.section}
                    onChange={(e) => handleSpecChange(idx, 'section', e.target.value)}
                    placeholder="Section"
                    className="w-28 sm:w-32 px-3 py-1.5 text-xs rounded-lg bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Spec (e.g. RAM)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 16 GB)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-[#f5f5f7] dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(idx)}
                    className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 disabled:opacity-50 text-white dark:text-black text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Compare</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
