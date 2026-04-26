import {
  find as findUsuarios,
  findOne as findUsuarioByEmail,
  insertOne as insertUsuario,
  deleteOne as deleteUsuario
} from "../repositories/usuarios.repo.js";

import {
  find as findPublicaciones,
  findOne as findPublicacionById,
  findByUsuario as findPublicacionesByUsuario,
  insertOne as insertPublicacion,
  deleteOne as deletePublicacion
} from "../repositories/ofertas.repo.js";

function requireNonEmpty(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`El campo "${fieldName}" es obligatorio.`);
  }
}

function normalizeEmail(email) {
  return email.trim();
}

function normalizeTipo(tipo) {
  return tipo.trim().toLowerCase();
}

export const root = {
  usuarios: async () => {
    return await findUsuarios();
  },

  usuarioPorEmail: async ({ email }) => {
    return await findUsuarioByEmail(email);
  },

  publicaciones: async () => {
    return await findPublicaciones();
  },

  publicacionPorId: async ({ id }) => {
    return await findPublicacionById(id);
  },

  publicacionesPorUsuario: async ({ usuarioEmail }) => {
    return await findPublicacionesByUsuario(usuarioEmail);
  },

  crearUsuario: async ({ nombre, email }) => {
    requireNonEmpty(nombre, "nombre");
    requireNonEmpty(email, "email");

    const emailNormalizado = normalizeEmail(email);
    const usuarioExistente = await findUsuarioByEmail(emailNormalizado);
    if (usuarioExistente) {
      throw new Error("El email ya esta registrado.");
    }

    const nuevoUsuario = {
      nombre: nombre.trim(),
      email: emailNormalizado
    };

    const insertedId = await insertUsuario(nuevoUsuario);

    return {
      id: insertedId.toString(),
      ...nuevoUsuario
    };
  },

  eliminarUsuario: async ({ email }) => {
    const deletedCount = await deleteUsuario(email);
    return deletedCount > 0;
  },

  crearPublicacion: async ({ titulo, descripcion, tipo, usuarioEmail }) => {
    requireNonEmpty(titulo, "titulo");
    requireNonEmpty(descripcion, "descripcion");
    requireNonEmpty(tipo, "tipo");
    requireNonEmpty(usuarioEmail, "usuarioEmail");

    const tipoNormalizado = normalizeTipo(tipo);
    if (tipoNormalizado !== "oferta" && tipoNormalizado !== "demanda") {
      throw new Error("El campo \"tipo\" debe ser oferta o demanda.");
    }

    const usuarioEmailNormalizado = normalizeEmail(usuarioEmail);
    const usuario = await findUsuarioByEmail(usuarioEmailNormalizado);
    if (!usuario) {
      throw new Error("No existe un usuario con ese email.");
    }

    const nuevaPublicacion = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      tipo: tipoNormalizado,
      usuarioEmail: usuarioEmailNormalizado
    };

    const insertedId = await insertPublicacion(nuevaPublicacion);

    return {
      id: insertedId.toString(),
      ...nuevaPublicacion
    };
  },

  eliminarPublicacion: async ({ id }) => {
    const deletedCount = await deletePublicacion(id);
    return deletedCount > 0;
  }
};