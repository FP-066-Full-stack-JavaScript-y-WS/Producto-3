import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let db;

export async function connectDB() {
  if (db) return db;

  try {
    const client = new MongoClient(uri);
    await client.connect();

    db = client.db(dbName);

    console.log("Conectado a MongoDB Atlas");
    return db;
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("La base de datos no está conectada");
  }

  return db;
}

/*Prompt IA:
Cómo conecto mi aplicación Node.js a MongoDB Atlas?
IA usada: ChatGPT */