import { getDB } from "../config/db.js";

const COLLECTION = "usuarios";

function mapUser(user) {
  return {
    id: user._id.toString(),
    nombre: user.nombre,
    email: user.email
  };
}

export async function find() {
  const db = getDB();
  const users = await db.collection(COLLECTION).find().toArray();

  return users.map(mapUser);
}

export async function findOne(email) {
  const db = getDB();
  const user = await db.collection(COLLECTION).findOne({ email });

  if (!user) return null;

  return mapUser(user);
}

export async function insertOne(user) {
  const db = getDB();
  const result = await db.collection(COLLECTION).insertOne(user);

  return result.insertedId;
}

export async function deleteOne(email) {
  const db = getDB();
  const result = await db.collection(COLLECTION).deleteOne({ email });

  return result.deletedCount;
}