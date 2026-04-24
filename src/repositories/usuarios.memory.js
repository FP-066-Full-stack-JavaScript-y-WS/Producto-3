const usuarios = [
  { id: "1", nombre: "Carlos", email: "carlos@test.com" }
];

let nextId = 2;

export function find() {
  return usuarios;
}

export function findOne(email) {
  return usuarios.find(usuario => usuario.email === email) || null;
}

export function insertOne(usuario) {
  const nuevoUsuario = {
    id: String(nextId++),
    ...usuario
  };

  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
}

export function deleteOne(email) {
  const index = usuarios.findIndex(usuario => usuario.email === email);

  if (index === -1) {
    return 0;
  }

  usuarios.splice(index, 1);
  return 1;
}