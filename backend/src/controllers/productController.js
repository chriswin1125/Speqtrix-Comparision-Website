import { productRepository } from '../data/productRepository.js';

export const getProducts = async (req, res) => {
  try {
    const { category, brand, search, minPrice, maxPrice, sort, page, limit } = req.query;
    const data = await productRepository.getAll({ category, brand, search, minPrice, maxPrice, sort, page, limit });
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productRepository.getById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q, category, brand, limit } = req.query;
    const result = await productRepository.searchLive({
      query: q,
      category,
      brand,
      limit: limit ? Number(limit) : 8
    });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCustomProduct = async (req, res) => {
  try {
    const { name, category, brand, price, modelNumber, specifications, image, overview, pros, cons } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Name and Category are required.' });
    }
    const product = await productRepository.createCustomProduct(req.body);
    res.status(201).json({ success: true, product, message: 'Custom product registered successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = productRepository.getCategories();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const { category } = req.query;
    const brands = productRepository.getBrands(category);
    res.json({ success: true, brands });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPopularComparisons = async (req, res) => {
  try {
    const comparisons = productRepository.getPopularComparisons();
    res.json({ success: true, comparisons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
