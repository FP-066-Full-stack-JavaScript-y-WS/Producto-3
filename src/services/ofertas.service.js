import {
  find,
  findOne,
  findByUsuario,
  insertOne,
  deleteOne
} from "../repositories/ofertas.mongo.js";

import {
  obtenerUsuarioPorEmail
} from "./usuarios.service.js";

function validarCampoObligatorio(valor, nombreCampo) {
  if (!valor || valor.trim() === "") {
    throw new Error(`El campo ${nombreCampo} es obligatorio`);
  }
}

export async function obtenerPublicaciones() {
  return await find();
}

export async function obtenerPublicacionPorId(id) {
  validarCampoObligatorio(id, "id");
  return await findOne(id);
}

export async function obtenerPublicacionesPorUsuario(usuarioEmail) {
  validarCampoObligatorio(usuarioEmail, "usuarioEmail");
  return await findByUsuario(usuarioEmail);
}

export async function crearPublicacion({ titulo, descripcion, tipo, usuarioEmail }) {
  validarCampoObligatorio(titulo, "titulo");
  validarCampoObligatorio(descripcion, "descripcion");
  validarCampoObligatorio(tipo, "tipo");
  validarCampoObligatorio(usuarioEmail, "usuarioEmail");

  const tipoNormalizado = tipo.toLowerCase();

  if (tipoNormalizado !== "oferta" && tipoNormalizado !== "demanda") {
    throw new Error("El tipo debe ser oferta o demanda");
  }

  const usuarioExistente = await obtenerUsuarioPorEmail(usuarioEmail);

  if (!usuarioExistente) {
    throw new Error("No se puede crear una publicación sin un usuario válido");
  }

  const nuevaPublicacion = {
    titulo,
    descripcion,
    tipo: tipoNormalizado,
    usuarioEmail
  };

  const insertedId = await insertOne(nuevaPublicacion);

  return {
    id: insertedId.toString(),
    ...nuevaPublicacion
  };
}

export async function eliminarPublicacion(id) {
  validarCampoObligatorio(id, "id");

  const deletedCount = await deleteOne(id);
  return deletedCount > 0;
}

/*Prompt IA:

Tengo un campo tipo en las publicaciones que solo debería permitir "oferta" o "demanda". 
¿Cuál es la mejor forma de validar esto en el backend y evitar errores si el usuario envía valores en mayúsculas o distintos formatos?

IA usada: ChatGPT */