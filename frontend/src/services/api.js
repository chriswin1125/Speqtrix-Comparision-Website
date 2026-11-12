const API_BASE = '/api';

export const api = {
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/products?${query}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async searchLive(query, category = '', brand = '') {
    const params = new URLSearchParams({ q: query, category, brand }).toString();
    const res = await fetch(`${API_BASE}/products/search?${params}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getBrands(category = '') {
    const params = category ? `?category=${category}` : '';
    const res = await fetch(`${API_BASE}/products/brands${params}`);
    if (!res.ok) throw new Error('Failed to fetch brands');
    return res.json();
  },

  async getPopularComparisons() {
    const res = await fetch(`${API_BASE}/products/popular-comparisons`);
    if (!res.ok) throw new Error('Failed to fetch popular comparisons');
    return res.json();
  },

  async compareProducts(productIds) {
    const ids = Array.isArray(productIds) ? productIds.join(',') : productIds;
    const res = await fetch(`${API_BASE}/compare?ids=${ids}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || 'Failed to compare products');
    }
    return data;
  },

  async createCustomProduct(payload) {
    const res = await fetch(`${API_BASE}/products/custom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create product');
    return data;
  },

  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  }
};
