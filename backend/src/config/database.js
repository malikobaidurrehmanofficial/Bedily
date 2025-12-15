import mongoose from 'mongoose';

// MongoDB connection options
const options = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Validate MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ Database Name: ${conn.connection.name}`);
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB reconnected');
    });

  } catch (error) {
    console.error('✗ MongoDB connection failed');
    console.error('Error details:', error.message);
    
    // Log additional details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error);
    }
    
    process.exit(1);
  }
};

/**
 * Gracefully close MongoDB connection
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
    process.exit(1);
  }
};

// Handle application termination
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

export default connectDB;
export { disconnectDB };
