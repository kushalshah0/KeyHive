import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let globalCache = global.mongooseConn;

if (!globalCache) {
  globalCache = global.mongooseConn = { conn: null, promise: null };
}

const isDev = process.env.NODE_ENV !== 'production';
const log = {
  info: (...args: unknown[]) => {
    if (isDev) console.info('[MongoDB]', ...args);
  },
  error: (...args: unknown[]) => console.error('[MongoDB]', ...args),
};

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    log.error('Missing MONGODB_URI environment variable.');
    throw new Error('Please set the MONGODB_URI environment variable.');
  }

  // Check if URI is still a placeholder
  if (MONGODB_URI.includes('your-username') || MONGODB_URI.includes('your-password') || MONGODB_URI.includes('your-cluster')) {
    log.error('MONGODB_URI appears to contain placeholder values. Please update .env with your actual MongoDB connection string.');
    throw new Error('MONGODB_URI contains placeholder values. Please update your .env file with actual credentials.');
  }

  if (globalCache.conn) {
    log.info('Using cached connection');
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    log.info('Connecting to database...');
    const start = Date.now();
    globalCache.promise = mongoose
      .connect(MONGODB_URI)
      .then((connection) => {
        log.info(`Connected in ${Date.now() - start}ms`);
        return connection;
      })
      .catch((error) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        log.error('Connection failed:', errorMessage);
        if (isDev) {
          log.error('Full error:', error);
        }
        globalCache.promise = null;
        // Create a more descriptive error
        const descriptiveError = new Error(
          `MongoDB connection failed: ${errorMessage}. Check your MONGODB_URI in .env and ensure your IP is whitelisted in MongoDB Atlas.`
        );
        throw descriptiveError;
      });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}

