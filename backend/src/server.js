import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import { productRepository } from './data/productRepository.js';
import productRoutes from './routes/productRoutes.js';
import compareRoutes from './routes/compareRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/compare', compareRoutes);

// System Health and Database Status Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'COMPARELY Electronics Comparison Platform',
    version: '1.0.0',
    db: getDbStatus()
  });
});

// Root friendly welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to COMPARELY - Premium Electronics Comparison Engine API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      search: '/api/products/search?q={query}',
      categories: '/api/products/categories',
      compare: '/api/compare?ids={id1},{id2}'
    }
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  await productRepository.init();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 COMPARELY BACKEND ENGINE ONLINE`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📊 Storage: ${getDbStatus().storageEngine}`);
    console.log(`======================================================\n`);
  });
};

startServer();
