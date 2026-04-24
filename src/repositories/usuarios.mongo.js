import { getDB } from "../config/db.js";

const COLLECTION = "usuarios";

function mapUser(user) {
  return {
    id: user._id.toString(),
    nombre: user.nombre,
    email: user.email
  };
}

// Obtener todos los usuarios
export async function find() {
  const db = getDB();
  const users = await db.collection(COLLECTION).find().toArray();

  return users.map(mapUser);
}

// Obtener usuario por email
export async function findOne(email) {
  const db = getDB();
  const user = await db.collection(COLLECTION).findOne({ email });

  if (!user) return null;

  return mapUser(user);
}

// Crear usuario
export async function insertOne(user) {
  const db = getDB();
  const result = await db.collection(COLLECTION).insertOne(user);

  return result.insertedId;
}

// Eliminar usuario por email
export async function deleteOne(email) {
  const db = getDB();
  const result = await db.collection(COLLECTION).deleteOne({ email });

  return result.deletedCount;
}