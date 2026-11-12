import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isConnectedToMongo = false;
const fallbackStorePath = path.join(__dirname, '../data/db_store.json');

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://chris123:chriswin123@cluster0.kvgihmd.mongodb.net/recruitment_db?retryWrites=true&w=majority';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnectedToMongo = true;
    console.log(`[Database] MongoDB Atlas Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`[Database] MongoDB Atlas not reachable: ${error.message}`);
    console.log(`[Database] Activating High-Performance Embedded JSON Data Store seamlessly.`);
    return false;
  }
};

export const getDbStatus = () => ({
  mongoConnected: isConnectedToMongo,
  storageEngine: isConnectedToMongo ? 'MongoDB Atlas (Cloud Cluster)' : 'Embedded JSON Store (Persistent)',
  host: isConnectedToMongo ? (mongoose.connection?.host || 'cluster0.kvgihmd.mongodb.net') : 'Local',
  timestamp: new Date().toISOString()
});
