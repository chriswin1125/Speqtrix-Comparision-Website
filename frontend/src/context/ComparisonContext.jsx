import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const ComparisonContext = createContext();

const STORAGE_KEY = 'nexus_compare_slots';
const HISTORY_KEY = 'nexus_recent_comparisons';

export const ComparisonProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed.map(p => ({
        ...p,
        price: (p.priceINR && p.priceINR > 5000) ? p.priceINR : (p.price < 5000 ? Math.round(p.price * 86.5) : p.price),
        currency: 'INR'
      }));
    } catch {
      return [];
    }
  });

  const [comparisonData, setComparisonData] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const [recentHistory, setRecentHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed.map(item => ({
        ...item,
        products: (item.products || []).map(p => ({
          ...p,
          price: (p.priceINR && p.priceINR > 5000) ? p.priceINR : (p.price < 5000 ? Math.round(p.price * 86.5) : p.price)
        }))
      }));
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Active locked category is determined by the first item in compareList
  const activeCategory = compareList.length > 0 ? compareList[0].category : null;

  // On mount, sync compareList items with live database to ensure verified pricing and specs
  useEffect(() => {
    if (compareList.length > 0) {
      const ids = compareList.map(p => p.id);
      Promise.all(ids.map(id => api.getProductById(id).catch(() => null)))
        .then(results => {
          const fresh = results.map(r => r?.product).filter(Boolean);
          if (fresh.length > 0) {
            setCompareList(prev => prev.map(oldItem => {
              const live = fresh.find(f => f.id === oldItem.id);
              return live || oldItem;
            }));
          }
        })
        .catch(() => {});
    }
  }, []);

  // Persist current slots to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  // Pre-compute & cache comparisonData in context whenever compareList changes
  useEffect(() => {
    if (compareList.length < 2) {
      setComparisonData(null);
      return;
    }

    const ids = compareList.map(p => p.id).join(',');
    setIsComparing(true);
    api.compareProducts(ids)
      .then(res => {
        if (res.comparison) {
          setComparisonData(res.comparison);
        }
      })
      .catch(err => {
        console.error('Comparison calculation error:', err);
      })
      .finally(() => {
        setIsComparing(false);
      });
  }, [compareList]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  /**
   * Adds a product to comparison.
   * Enforces:
   * 1. Max 4 products simultaneously.
   * 2. Category homogeneity: all subsequent products must match product[0].category.
   * 3. Prevents duplicates.
   */
  const addProduct = (product) => {
    if (!product || !product.id) return false;

    // Check if already in list
    if (compareList.some(p => p.id === product.id)) {
      showToast(`"${product.name}" is already in the comparison table.`, 'warning');
      return false;
    }

    // Check max limit (up to 4 products)
    if (compareList.length >= 4) {
      showToast('Maximum 4 products can be compared simultaneously. Remove one to add this.', 'warning');
      return false;
    }

    // Check category match
    if (compareList.length > 0) {
      const currentCategory = compareList[0].category;
      if (product.category.toLowerCase() !== currentCategory.toLowerCase()) {
        showToast(
          `Category Mismatch: You are currently comparing "${currentCategory}" products. "${product.name}" is in "${product.category}". Please select another ${currentCategory}.`,
          'error'
        );
        return false;
      }
    }

    const updated = [...compareList, product];
    setCompareList(updated);
    showToast(`Added "${product.name}" to comparison.`, 'success');

    // If we have 2 or more products, record in recent comparisons history
    if (updated.length >= 2) {
      recordRecentComparison(updated);
    }
    return true;
  };

  const removeProduct = (productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
    showToast('Product removed from comparison.', 'info');
  };

  const clearComparison = () => {
    setCompareList([]);
    setComparisonData(null);
    showToast('Comparison cleared.', 'info');
  };

  const swapProducts = (indexA, indexB) => {
    if (
      indexA < 0 || indexA >= compareList.length ||
      indexB < 0 || indexB >= compareList.length ||
      indexA === indexB
    ) return;

    setCompareList(prev => {
      const next = [...prev];
      const temp = next[indexA];
      next[indexA] = next[indexB];
      next[indexB] = temp;
      return next;
    });
  };

  const replaceProductAt = (index, newProduct) => {
    if (index < 0 || index >= compareList.length || !newProduct) return false;

    const otherItems = compareList.filter((_, i) => i !== index);
    if (otherItems.length > 0) {
      if (newProduct.category.toLowerCase() !== otherItems[0].category.toLowerCase()) {
        showToast(`Must match current category (${otherItems[0].category}).`, 'error');
        return false;
      }
    }

    setCompareList(prev => {
      const next = [...prev];
      next[index] = newProduct;
      return next;
    });
    return true;
  };

  const recordRecentComparison = (products) => {
    if (products.length < 2) return;
    const item = {
      id: products.map(p => p.id).join('-vs-'),
      date: new Date().toISOString(),
      category: products[0].category,
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        image: p.image,
        price: p.price
      }))
    };

    setRecentHistory(prev => {
      const filtered = prev.filter(h => h.id !== item.id);
      const updated = [item, ...filtered].slice(0, 8);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const launchDirectComparison = async (productIds) => {
    try {
      const fetched = [];
      for (const id of productIds) {
        const res = await api.getProductById(id);
        if (res.product) fetched.push(res.product);
      }
      if (fetched.length >= 2) {
        const firstCat = fetched[0].category;
        const valid = fetched.every(p => p.category === firstCat);
        if (valid) {
          setCompareList(fetched.slice(0, 4));
          recordRecentComparison(fetched.slice(0, 4));
          return true;
        } else {
          showToast('Products must belong to the same category to compare.', 'error');
          return false;
        }
      }
    } catch (err) {
      showToast('Could not load comparison products.', 'error');
    }
    return false;
  };

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        comparisonData,
        isComparing,
        activeCategory,
        addProduct,
        removeProduct,
        clearComparison,
        swapProducts,
        replaceProductAt,
        recentHistory,
        toastMessage,
        showToast,
        launchDirectComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
