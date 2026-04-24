import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const COLLECTION = "publicaciones";

function mapPublicacion(pub) {
  return {
    id: pub._id.toString(),
    titulo: pub.titulo,
    descripcion: pub.descripcion,
    tipo: pub.tipo,
    usuarioEmail: pub.usuarioEmail
  };
}

export async function find() {
  const db = getDB();
  const publicaciones = await db.collection(COLLECTION).find().toArray();

  return publicaciones.map(mapPublicacion);
}

export async function findOne(id) {
  const db = getDB();
  const publicacion = await db
    .collection(COLLECTION)
    .findOne({ _id: new ObjectId(id) });

  if (!publicacion) return null;

  return mapPublicacion(publicacion);
}

export async function findByUsuario(usuarioEmail) {
  const db = getDB();
  const publicaciones = await db
    .collection(COLLECTION)
    .find({ usuarioEmail })
    .toArray();

  return publicaciones.map(mapPublicacion);
}

export async function insertOne(publicacion) {
  const db = getDB();
  const result = await db.collection(COLLECTION).insertOne(publicacion);

  return result.insertedId;
}

export async function deleteOne(id) {
  const db = getDB();
  const result = await db
    .collection(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount;
}