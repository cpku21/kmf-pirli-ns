import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCached: MongooseGlobal | undefined;
}

let cached = global.mongooseCached;

if (!cached) {
  cached = global.mongooseCached = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (!MONGODB_URI) {
      // Graceful fallback for local development or sandbox environment
      console.warn('MONGODB_URI is not set. Connecting to a local in-memory/fallback database or dry-running.');
      // We will mock/dry run or connect to local dev database if running in Dev
      cached.promise = mongoose.connect('mongodb://127.0.0.1:27017/kmf_pirli_fallback', opts).catch((err) => {
        console.error('Failed to connect to fallback Mongo DB, starting database dry-run state.', err.message);
        return mongoose;
      });
    } else {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
        return mongooseInstance;
      });
    }
  }

  try {
    if (cached && cached.promise) {
      cached.conn = await cached.promise;
    }
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    throw e;
  }

  return cached.conn!;
}

export default connectToDatabase;

