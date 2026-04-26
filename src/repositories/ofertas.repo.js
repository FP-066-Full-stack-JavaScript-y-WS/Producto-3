import * as memory from "./ofertas.memory.js";
import * as mongo from "./ofertas.mongo.js";

const useMemory = process.env.USE_MEMORY === "true";

export function find() {
  return useMemory ? memory.find() : mongo.find();
}

export function findOne(id) {
  return useMemory ? memory.findOne(id) : mongo.findOne(id);
}

export function findByUsuario(usuarioEmail) {
  return useMemory
    ? memory.findByUsuario(usuarioEmail)
    : mongo.findByUsuario(usuarioEmail);
}

export function insertOne(publicacion) {
  if (useMemory) {
    const created = memory.insertOne(publicacion);
    return created.id;
  }

  return mongo.insertOne(publicacion);
}

export function deleteOne(id) {
  return useMemory ? memory.deleteOne(id) : mongo.deleteOne(id);
}
