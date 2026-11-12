import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEED_PRODUCTS } from './seedData.js';
import { CATEGORIES } from './categoriesData.js';
import { Product } from '../models/Product.js';
import { getDbStatus } from '../config/db.js';

import { importCsvProducts } from './importCsv.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'db_store.json');

// Initialize local JSON storage if not exists
let localProducts = [];

const getNormalizedSeedProducts = () => {
  return SEED_PRODUCTS.map(p => ({
    ...p,
    price: p.priceINR || (p.price ? Math.round(p.price * 85) : 0),
    currency: 'INR',
    priceINR: p.priceINR || (p.price ? Math.round(p.price * 85) : 0)
  }));
};

const loadAllDefaultProducts = () => {
  const normalizedSeed = getNormalizedSeedProducts();
  let csvProducts = [];
  try {
    csvProducts = importCsvProducts();
  } catch (err) {
    console.error('[ProductRepository] Failed to import CSV products:', err);
  }
  console.log(`[ProductRepository] Loaded ${normalizedSeed.length} baseline products + ${csvProducts.length} CSV dataset mobiles.`);
  return [...normalizedSeed, ...csvProducts];
};

const loadStore = () => {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, 'utf-8');
      localProducts = JSON.parse(data);
      if (localProducts.length < 100 || localProducts[0]?.currency === 'USD') {
        console.log('[ProductRepository] Rebuilding local store with 930+ mobile products in INR...');
        localProducts = loadAllDefaultProducts();
        saveStore();
      }
    } else {
      localProducts = loadAllDefaultProducts();
      saveStore();
    }
  } catch (err) {
    console.error('Error loading db_store.json, resetting to default products', err);
    localProducts = loadAllDefaultProducts();
  }
};

const saveStore = () => {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(localProducts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db_store.json', err);
  }
};

loadStore();

export const productRepository = {
  async init() {
    loadStore();
    // If Mongo is connected, sync if empty or outdated
    const status = getDbStatus();
    if (status.mongoConnected) {
      try {
        const count = await Product.countDocuments();
        if (count < 100) {
          console.log('[ProductRepository] Seeding/Updating MongoDB with complete product catalog in INR...');
          await Product.deleteMany({});
          await Product.insertMany(localProducts);
        }
      } catch (err) {
        console.warn('[ProductRepository] Mongo sync warning:', err.message);
      }
    }
  },

  async getAll({ category, brand, search, minPrice, maxPrice, sort, page = 1, limit = 50 }) {
    let items = [...localProducts];

    if (category && category !== 'all') {
      items = items.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (brand && brand !== 'all') {
      items = items.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.modelNumber && p.modelNumber.toLowerCase().includes(q)) ||
        (p.series && p.series.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (minPrice !== undefined && minPrice !== '') {
      items = items.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      items = items.filter(p => p.price <= Number(maxPrice));
    }

    // Sort
    if (sort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: popularity
      items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    const total = items.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginated = items.slice(startIndex, startIndex + Number(limit));

    return {
      products: paginated,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    };
  },

  async getById(id) {
    const item = localProducts.find(p => p.id === id || p.id.toLowerCase() === id.toLowerCase());
    return item || null;
  },

  async searchLive({ query, category, brand, limit = 8 }) {
    if (!query || !query.trim()) {
      // Return top trending
      let filtered = [...localProducts];
      if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
      }
      return {
        results: filtered.slice(0, limit),
        suggestions: ['Samsung Galaxy S25 Ultra', 'Apple iPhone 16 Pro Max', 'Apple MacBook Pro 16', 'LG OLED evo G4', 'Daikin 1.5 Ton AC'],
        fallbackTriggered: false
      };
    }

    const q = query.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);

    let matches = localProducts.filter(p => {
      const fullName = p.name.toLowerCase();
      const b = p.brand.toLowerCase();
      const model = (p.modelNumber || '').toLowerCase();
      const cat = p.category.toLowerCase();
      const ser = (p.series || '').toLowerCase();

      // Check category match if provided
      if (category && category !== 'all' && p.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
      // Check brand match if provided
      if (brand && brand !== 'all' && p.brand.toLowerCase() !== brand.toLowerCase()) {
        return false;
      }

      // Check all query words
      return words.every(word => 
        fullName.includes(word) || b.includes(word) || model.includes(word) || cat.includes(word) || ser.includes(word)
      );
    });

    if (matches.length > 0) {
      return {
        results: matches.slice(0, limit),
        total: matches.length,
        suggestions: matches.map(m => m.name).slice(0, 5),
        fallbackTriggered: false
      };
    }

    // SMART FALLBACK MECHANISM:
    // If no exact match:
    // 1. Try matching with partial brand or model tokens
    // 2. Recommend alternatives in the same category
    // 3. Offer custom product entry option
    let fallbackAlternatives = [];

    // Find any product matching brand
    const brandMatches = localProducts.filter(p => 
      words.some(w => p.brand.toLowerCase().includes(w) || (p.series && p.series.toLowerCase().includes(w)))
    );

    // Find products in requested category or deduced category
    let targetCategory = category && category !== 'all' ? category : null;
    if (!targetCategory) {
      // Check if any word resembles a category name
      for (const cat of CATEGORIES) {
        if (words.some(w => cat.name.toLowerCase().includes(w) || cat.id.toLowerCase().includes(w))) {
          targetCategory = cat.id;
          break;
        }
      }
    }

    let categoryAlternatives = [];
    if (targetCategory) {
      categoryAlternatives = localProducts.filter(p => p.category === targetCategory);
    } else {
      // Top flagship recommendations
      categoryAlternatives = localProducts.filter(p => p.popularity >= 95);
    }

    // Combine fallbacks
    const seen = new Set();
    [...brandMatches, ...categoryAlternatives].forEach(item => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        fallbackAlternatives.push(item);
      }
    });

    return {
      results: fallbackAlternatives.slice(0, limit),
      total: fallbackAlternatives.length,
      fallbackTriggered: true,
      query,
      targetCategory: targetCategory || 'all',
      fallbackMessage: `We couldn't find exact factory records for "${query}". Displaying closely related high-value alternatives and alternative models below. You can also add your custom device specifications to compare immediately.`
    };
  },

  async createCustomProduct(productData) {
    const slug = (productData.name || 'custom-product')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

    const newProduct = {
      id: slug,
      name: productData.name.trim(),
      brand: productData.brand ? productData.brand.trim() : 'Custom Brand',
      category: productData.category || 'smartphones',
      modelNumber: productData.modelNumber ? productData.modelNumber.trim() : 'CUSTOM-DEV-01',
      series: productData.series || 'User Custom Device',
      price: Number(productData.price) || 0,
      currency: productData.currency || 'INR',
      priceINR: productData.priceINR || Number(productData.price) || 0,
      releaseDate: productData.releaseDate || new Date().toISOString().split('T')[0],
      popularity: 70,
      verified: false,
      isUserAdded: true,
      rating: 4.5,
      image: productData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      gallery: [productData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
      overview: productData.overview || 'Custom product configuration created by user for comparative analysis.',
      pros: productData.pros && productData.pros.length > 0 ? productData.pros : ['User-defined custom specifications'],
      cons: productData.cons && productData.cons.length > 0 ? productData.cons : ['Specifications provided by user, not factory verified'],
      specifications: productData.specifications || {},
      metrics: productData.metrics || {},
      dataSource: 'User-Provided Specifications',
      lastUpdated: new Date()
    };

    localProducts.unshift(newProduct);
    saveStore();

    // If Mongo is connected, persist to MongoDB as well
    const status = getDbStatus();
    if (status.mongoConnected) {
      try {
        await Product.create(newProduct);
      } catch (err) {
        console.warn('Could not insert custom product to MongoDB:', err.message);
      }
    }

    return newProduct;
  },

  getCategories() {
    return CATEGORIES.map(cat => {
      const count = localProducts.filter(p => p.category === cat.id).length;
      return {
        ...cat,
        productCount: count
      };
    });
  },

  getBrands(category) {
    let items = localProducts;
    if (category && category !== 'all') {
      items = items.filter(p => p.category === category);
    }
    const brandsSet = new Set(items.map(p => p.brand));
    return Array.from(brandsSet).sort();
  },

  getPopularComparisons() {
    return [
      {
        id: 'flagship-smartphones',
        title: 'Ultimate 2025 Flagship Faceoff',
        category: 'smartphones',
        productIds: ['samsung-galaxy-s25-ultra', 'apple-iphone-16-pro-max', 'oneplus-13'],
        tag: 'Trending'
      },
      {
        id: 'creator-laptops',
        title: 'M4 Max vs Core Ultra 9 Titans',
        category: 'laptops',
        productIds: ['apple-macbook-pro-16-m4-max', 'dell-xps-16-9640', 'asus-rog-zephyrus-g16-2024'],
        tag: 'Pro Workstations'
      },
      {
        id: 'premium-smart-tvs',
        title: 'LG OLED G4 vs Samsung QD-OLED S95D',
        category: 'smart-tvs',
        productIds: ['lg-oled-evo-g4-65', 'samsung-s95d-qd-oled-65'],
        tag: 'Home Cinema'
      },
      {
        id: 'smart-inverter-acs',
        title: '5-Star Inverter AC Shootout',
        category: 'air-conditioners',
        productIds: ['daikin-1-5-ton-5-star-inverter-ac', 'lg-1-5-ton-5-star-ai-dual-inverter-ac'],
        tag: 'Energy Savers'
      },
      {
        id: 'adventure-smartwatches',
        title: 'Titanium Adventure Wearables',
        category: 'smartwatches',
        productIds: ['apple-watch-ultra-2', 'samsung-galaxy-watch-ultra'],
        tag: 'Ultra Series'
      },
      {
        id: 'noise-cancelling-flagships',
        title: 'Sony WH-1000XM5 vs AirPods Max',
        category: 'headphones',
        productIds: ['sony-wh-1000xm5', 'apple-airpods-max-usbc'],
        tag: 'Audiophile ANC'
      },
      {
        id: 'next-gen-consoles',
        title: 'PlayStation 5 Pro vs Xbox Series X',
        category: 'gaming-consoles',
        productIds: ['sony-playstation-5-pro', 'microsoft-xbox-series-x'],
        tag: '4K Gaming'
      }
    ];
  }
};
