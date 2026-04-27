import {
  find,
  findOne,
  insertOne,
  deleteOne
} from "../repositories/usuarios.mongo.js";

function validarCampoObligatorio(valor, nombreCampo) {
  if (!valor || valor.trim() === "") {
    throw new Error(`El campo ${nombreCampo} es obligatorio`);
  }
}

export async function obtenerUsuarios() {
  return await find();
}

export async function obtenerUsuarioPorEmail(email) {
  validarCampoObligatorio(email, "email");
  return await findOne(email);
}

export async function crearUsuario({ nombre, email }) {
  validarCampoObligatorio(nombre, "nombre");
  validarCampoObligatorio(email, "email");

  const usuarioExistente = await findOne(email);

  if (usuarioExistente) {
    throw new Error("Ya existe un usuario con ese email");
  }

  const nuevoUsuario = {
    nombre,
    email
  };

  const insertedId = await insertOne(nuevoUsuario);

  return {
    id: insertedId.toString(),
    ...nuevoUsuario
  };
}

export async function eliminarUsuario(email) {
  validarCampoObligatorio(email, "email");

  const deletedCount = await deleteOne(email);
  return deletedCount > 0;
}