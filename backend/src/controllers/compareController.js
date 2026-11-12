import { productRepository } from '../data/productRepository.js';
import { analyzeComparison } from '../engine/comparisonEngine.js';

export const compareProducts = async (req, res) => {
  try {
    const { ids } = req.query; // e.g. "samsung-galaxy-s25-ultra,apple-iphone-16-pro-max" or array
    let productIds = [];

    if (Array.isArray(ids)) {
      productIds = ids;
    } else if (typeof ids === 'string') {
      productIds = ids.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (!productIds || productIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least 2 product IDs to compare (e.g. ?ids=prod1,prod2).'
      });
    }

    if (productIds.length > 5) {
      productIds = productIds.slice(0, 5); // Max 5 products simultaneously
    }

    // Fetch each product in order
    const products = [];
    for (const id of productIds) {
      const prod = await productRepository.getById(id);
      if (prod) {
        products.push(prod);
      }
    }

    if (products.length < 2) {
      return res.status(404).json({
        success: false,
        message: 'One or more requested products could not be located in our catalog.'
      });
    }

    // Run comparison analysis
    const analysis = analyzeComparison(products);

    if (!analysis.canCompare) {
      return res.status(400).json({
        success: false,
        error: analysis.error,
        mismatchedCategories: analysis.mismatchedCategories
      });
    }

    res.json({
      success: true,
      comparison: analysis
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
