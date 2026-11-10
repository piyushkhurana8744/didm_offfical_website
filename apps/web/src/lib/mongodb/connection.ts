import "server-only";
import mongoose from "mongoose";

type Cache = { connection: typeof mongoose | null; promise: Promise<typeof mongoose> | null; database?: string };
const globalMongo = globalThis as typeof globalThis & { __didmMongo?: Cache };
const cache = globalMongo.__didmMongo ?? { connection: null, promise: null };
globalMongo.__didmMongo = cache;

export async function connectMongo() {
  const useTest=process.env.CMS_USE_TEST_DATABASE==="true";
  const uri = (useTest?process.env.TEST_MONGODB_URI:process.env.MONGODB_URI)?.trim();
  const dbName = (useTest?process.env.TEST_MONGODB_DB_NAME:process.env.MONGODB_DB_NAME)?.trim();
  if (!uri) throw new Error("MONGODB_URI is required for the DIDM CMS");
  if (!dbName || !/^[a-zA-Z0-9_-]+$/.test(dbName)) throw new Error("A valid MONGODB_DB_NAME is required for the DIDM CMS");
  if(useTest&&(!/test/i.test(dbName)||dbName===process.env.MONGODB_DB_NAME))throw new Error("TEST_MONGODB_DB_NAME must be a distinct test-named database");
  if(cache.database&&cache.database!==dbName)throw new Error("Refusing to switch CMS databases in a running process");
  if (cache.connection&&mongoose.connection.readyState===1) return cache.connection;
  if(cache.connection&&mongoose.connection.readyState===0)cache.connection=null;
  cache.database=dbName;
  cache.promise ??= mongoose.connect(uri, {
    dbName, maxPoolSize: 10, minPoolSize: 0, serverSelectionTimeoutMS: 8_000,
    connectTimeoutMS: 8_000, socketTimeoutMS: 20_000, maxIdleTimeMS: 60_000,
  });
  try { cache.connection = await cache.promise; return cache.connection; }
  catch { cache.promise = null; cache.connection=null; cache.database=undefined; throw new Error("DIDM CMS database is unavailable"); }
}
