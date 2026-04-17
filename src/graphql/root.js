const usuarios = [
  { id: "1", nombre: "Carlos", email: "carlos@test.com" }
];

let nextId = 2;

export const root = {
  usuarios: () => usuarios,

  crearUsuario: ({ nombre, email }) => {
    const nuevo = {
      id: String(nextId++),
      nombre,
      email
    };

    usuarios.push(nuevo);
    return nuevo;
  }
};