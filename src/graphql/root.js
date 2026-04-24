import {
  find as findUsuarios,
  findOne as findUsuarioByEmail,
  insertOne as insertUsuario,
  deleteOne as deleteUsuario
} from "../repositories/usuarios.mongo.js";

import {
  find as findPublicaciones,
  findOne as findPublicacionById,
  findByUsuario as findPublicacionesByUsuario,
  insertOne as insertPublicacion,
  deleteOne as deletePublicacion
} from "../repositories/ofertas.mongo.js";

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
    const nuevoUsuario = {
      nombre,
      email
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
    const nuevaPublicacion = {
      titulo,
      descripcion,
      tipo,
      usuarioEmail
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