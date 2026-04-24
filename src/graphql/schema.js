export const schemaString = `
  type Usuario {
    id: ID!
    nombre: String!
    email: String!
  }

  type Publicacion {
    id: ID!
    titulo: String!
    descripcion: String!
    tipo: String!
    usuarioEmail: String!
  }

  type Query {
    usuarios: [Usuario!]!
    usuarioPorEmail(email: String!): Usuario

    publicaciones: [Publicacion!]!
    publicacionPorId(id: ID!): Publicacion
    publicacionesPorUsuario(usuarioEmail: String!): [Publicacion!]!
  }

  type Mutation {
    crearUsuario(nombre: String!, email: String!): Usuario!
    eliminarUsuario(email: String!): Boolean!

    crearPublicacion(
      titulo: String!
      descripcion: String!
      tipo: String!
      usuarioEmail: String!
    ): Publicacion!

    eliminarPublicacion(id: ID!): Boolean!
  }
`;