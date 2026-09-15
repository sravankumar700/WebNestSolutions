import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUris = [
    process.env.MONGODB_URI,
    'mongodb://127.0.0.1:27017/webnest_db',
  ].filter(Boolean) as string[];

  let lastError: unknown;

  for (const uri of mongoUris) {
    try {
      await mongoose.connect(uri);
      return true;
    } catch (error) {
      lastError = error;
    }
  }

  console.error('[MongoDB Connection Error]: All configured database URLs failed to connect.', lastError);
  return false;
};
