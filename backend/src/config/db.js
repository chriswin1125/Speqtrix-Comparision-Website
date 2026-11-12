import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isConnectedToMongo = false;
const fallbackStorePath = path.join(__dirname, '../data/db_store.json');

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/comparator_db';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnectedToMongo = true;
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`[Database] MongoDB not reachable at "${uri}".`);
    console.log(`[Database] Activating High-Performance Embedded JSON Data Store seamlessly.`);
    return false;
  }
};

export const getDbStatus = () => ({
  mongoConnected: isConnectedToMongo,
  storageEngine: isConnectedToMongo ? 'MongoDB' : 'Embedded JSON Store (Persistent)',
  timestamp: new Date().toISOString()
});
