// lib/mongodb.js

import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
// Check if the MONGODB_URI environment variable is set
if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const uri = process.env.MONGODB_URI;
const options = {}; // You can add options here, e.g., options = { serverApi: ServerApiVersion.v1 }

// 1. Declare a variable to hold the connected client promise
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// 2. Caching mechanism for development environment
// This ensures the client is not re-established on Next.js Hot Module Reloads.
if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, simply create a new client and promise
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * 3. Export a function that returns the client promise
 * This is the function you will call in your Route Handlers.
 * @returns {Promise<MongoClient>} A promise that resolves to the connected MongoClient instance.
 */
export async function connectToDatabase() {
  const connectedClient = await clientPromise;

  // You can return the connected client and/or the default database instance
  // Note: The database name is often included in the URI, or you can specify it here:
  // const db = connectedClient.db("yourDatabaseName");

  return connectedClient;
}

// Optional: Export the promise directly for use in older Next.js patterns
export default clientPromise;
