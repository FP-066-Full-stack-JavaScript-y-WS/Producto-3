import {
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
  crearUsuario,
  eliminarUsuario
} from "../services/usuarios.service.js";

import {
  obtenerPublicaciones,
  obtenerPublicacionPorId,
  obtenerPublicacionesPorUsuario,
  crearPublicacion,
  eliminarPublicacion
} from "../services/ofertas.service.js";

export const root = {
  usuarios: async () => {
    return await obtenerUsuarios();
  },

  usuarioPorEmail: async ({ email }) => {
    return await obtenerUsuarioPorEmail(email);
  },

  publicaciones: async () => {
    return await obtenerPublicaciones();
  },

  publicacionPorId: async ({ id }) => {
    return await obtenerPublicacionPorId(id);
  },

  publicacionesPorUsuario: async ({ usuarioEmail }) => {
    return await obtenerPublicacionesPorUsuario(usuarioEmail);
  },

  crearUsuario: async ({ nombre, email }) => {
    return await crearUsuario({ nombre, email });
  },

  eliminarUsuario: async ({ email }) => {
    return await eliminarUsuario(email);
  },

  crearPublicacion: async ({ titulo, descripcion, tipo, usuarioEmail }) => {
    return await crearPublicacion({
      titulo,
      descripcion,
      tipo,
      usuarioEmail
    });
  },

  eliminarPublicacion: async ({ id }) => {
    return await eliminarPublicacion(id);
  }
};

/*Prompt IA:
¿Cuándo se debe usar async/await en los resolvers de GraphQL?
IA usada: ChatGPT */