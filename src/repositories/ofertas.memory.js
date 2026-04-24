const publicaciones = [
  {
    id: "1",
    titulo: "Desarrollador Frontend",
    descripcion: "Oferta para trabajar con HTML, CSS y JavaScript",
    tipo: "oferta",
    usuarioEmail: "carlos@test.com"
  }
];

let nextId = 2;

export function find() {
  return publicaciones;
}

export function findOne(id) {
  return publicaciones.find(publicacion => publicacion.id === id) || null;
}

export function findByUsuario(usuarioEmail) {
  return publicaciones.filter(
    publicacion => publicacion.usuarioEmail === usuarioEmail
  );
}

export function insertOne(publicacion) {
  const nuevaPublicacion = {
    id: String(nextId++),
    ...publicacion
  };

  publicaciones.push(nuevaPublicacion);
  return nuevaPublicacion;
}

export function deleteOne(id) {
  const index = publicaciones.findIndex(publicacion => publicacion.id === id);

  if (index === -1) {
    return 0;
  }

  publicaciones.splice(index, 1);
  return 1;
}