import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.warn('\n⚠️ [Database Warning]: MONGODB_URI is not set in server/.env.');
    console.warn('ℹ️ To enable persistent database storage, add your MongoDB Atlas connection string to server/.env.\n');
    isConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ [MongoDB Connection Error]:', error.message);
    isConnected = false;
    return false;
  }
};

export const getDBStatus = () => {
  return {
    configured: Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim() !== ''),
    connected: isConnected && mongoose.connection.readyState === 1
  };
};
