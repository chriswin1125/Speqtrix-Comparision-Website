import express from 'express';
import {
  getProducts,
  getProductById,
  searchProducts,
  createCustomProduct,
  getCategories,
  getBrands,
  getPopularComparisons
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/popular-comparisons', getPopularComparisons);
router.get('/:id', getProductById);
router.post('/custom', createCustomProduct);

export default router;
