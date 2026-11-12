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
    platform: 'SPECORA Electronics Comparison Platform',
    version: '1.0.0',
    tagline: 'Know More. Compare Better.',
    slogan: 'Discover. Compare. Decide.',
    db: getDbStatus()
  });
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.join(__dirname, '../../frontend/dist');

// Serve static frontend assets if built
if (fs.existsSync(frontendDist)) {
  console.log(`[Server] Serving production frontend build from ${frontendDist}`);
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  // Root friendly welcome if frontend is not embedded
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to SPECORA - Discover. Compare. Decide. (API)',
      tagline: 'Know More. Compare Better.',
      endpoints: {
        health: '/api/health',
        products: '/api/products',
        search: '/api/products/search?q={query}',
        categories: '/api/products/categories',
        compare: '/api/compare?ids={id1},{id2}'
      }
    });
  });
}

// Start Server
const startServer = async () => {
  await connectDB();
  await productRepository.init();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 SPECORA BACKEND ENGINE ONLINE`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📊 Storage: ${getDbStatus().storageEngine}`);
    console.log(`======================================================\n`);
  });
};

startServer();
