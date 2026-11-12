import express from 'express';
import { compareProducts } from '../controllers/compareController.js';

const router = express.Router();

router.get('/', compareProducts);

export default router;
