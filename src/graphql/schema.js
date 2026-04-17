export const schemaString = `
  type Usuario {
    id: ID!
    nombre: String!
    email: String!
  }

  type Query {
    usuarios: [Usuario!]!
  }

  type Mutation {
    crearUsuario(nombre: String!, email: String!): Usuario!
  }
`;