# NodeNinjas - Plataforma Empleo | Producto 3: Backend

## Descripción

Este repositorio contiene el backend de la aplicación **Plataforma Empleo**, desarrollado con **Node.js**, **ExpressJS** y **GraphQL**.

La aplicación permite gestionar usuarios y publicaciones (ofertas y demandas de empleo), ofreciendo operaciones de consulta y modificación de datos mediante una API GraphQL.

---

## Tecnologías utilizadas

* Node.js
* ExpressJS
* GraphQL
* MongoDB Atlas

---

## Arquitectura

El proyecto sigue una arquitectura por capas:

* **GraphQL**: define el esquema y gestiona las peticiones (queries y mutations)
* **Services**: contienen la lógica de negocio y validaciones
* **Repositories**: gestionan el acceso a datos
* **Config**: configuración de la base de datos

Esta estructura permite separar responsabilidades y facilita el mantenimiento y la escalabilidad del sistema.

---

## Persistencia de datos

El proyecto incluye dos implementaciones de persistencia:

* **MongoDB** (`*.mongo.js`): utilizada en el entorno real de ejecución
* **Memoria** (`*.memory.js`): versión alternativa sin base de datos

Por **requerimiento de la actividad**, se han mantenido ambas implementaciones.
Los archivos en memoria permiten ejecutar o revisar el proyecto sin necesidad de conexión a una base de datos externa.

---

## Ejecución del proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:
   Crear un archivo `.env` basado en `.env.example`

3. Ejecutar el servidor:

```bash
npm start
```

4. Acceder a la API GraphQL:

```
http://localhost:4000/graphql
```

---

## Notas

* La versión completa del proyecto utiliza MongoDB Atlas como base de datos.
* La versión en memoria se incluye únicamente con fines académicos y de evaluación.
* Todas las operaciones se realizan a través del endpoint `/graphql`.

---