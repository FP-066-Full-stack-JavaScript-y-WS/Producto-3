import * as memory from "./usuarios.memory.js";
import * as mongo from "./usuarios.mongo.js";

const useMemory = process.env.USE_MEMORY === "true";

export function find() {
  return useMemory ? memory.find() : mongo.find();
}

export function findOne(email) {
  return useMemory ? memory.findOne(email) : mongo.findOne(email);
}

export function insertOne(user) {
  if (useMemory) {
    const created = memory.insertOne(user);
    return created.id;
  }

  return mongo.insertOne(user);
}

export function deleteOne(email) {
  return useMemory ? memory.deleteOne(email) : mongo.deleteOne(email);
}
