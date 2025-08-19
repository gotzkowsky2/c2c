const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return mongoose.connection;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not set');
  }

  mongoose.set('strictQuery', true);

  try {
    const connection = await mongoose.connect(mongoUri);
    isConnected = connection.connection.readyState === 1;
    // eslint-disable-next-line no-console
    console.log('MongoDB connected:', connection.connection.host);
    return connection.connection;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };


