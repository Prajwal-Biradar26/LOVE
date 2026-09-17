import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('ℹ️  No MONGODB_URI provided in .env. Running with local in-memory fallback storage.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✨ Connected to MongoDB: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB connection error: ${error.message}. Falling back to in-memory storage.`);
    isConnected = false;
    return false;
  }
};

export const isDatabaseConnected = () => isConnected;
